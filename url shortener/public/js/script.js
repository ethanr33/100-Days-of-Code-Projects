
window.onload = () => {
  
  const localStorage = window.localStorage;
  
  const headerMenuButton = document.getElementById("menu-button");
  const headerMenu = document.getElementById("dropdown-menu");
  
  const linkInput = document.getElementById("link-input");
  const submitLink = document.getElementById("link-submit");
  const feedbackText = document.getElementById("feedback-text");
  
  const outputContainer = document.getElementById("output-container-react");
  
  const buttonTimeout = 1000;
  
  let linkBoxes = [];  
  
  class LinkOutput extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div id="output-container">
          {this.props.boxes.map((element, _) =>
              <LinkBox input={element.input} output={element.output} key={element.key} />
          )}
        </div>
      );
    }
  }
  
  class LinkBox extends React.Component {
    constructor(props) {
      super(props);
      
      this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
      bindButtonEvents();
      copyToClipboard(this.props.output);
    }
    render() {
      return (
        <div resultid={this.props.id} className="result-container">
          <div className="result-container-orig">
            <p className="orig-link">{this.props.input}</p>
            <hr />
          </div>
          <div className="result-container-new">
            <p className="shortened-link">{this.props.output}</p>
            <button onClick={this.handleClick} className="copy-link">Copy</button>
          </div>
        </div>
      );
    }
  }
  
  if (localStorage.getItem("boxes") === null) {
    localStorage.setItem("boxes", JSON.stringify(linkBoxes));
  } else {
    linkBoxes = JSON.parse(localStorage.getItem("boxes"));
    ReactDOM.render(<LinkOutput boxes={linkBoxes} />, outputContainer);
  }
  
  headerMenuButton.addEventListener("click", () => {
    headerMenu.classList.toggle("hidden");
  })
  
  submitLink.addEventListener("click", () => {
    let input = linkInput.value;
    let isInputValid = validateInput(input);
    if (isInputValid) {
      generateCard(input);
    }
  })
  
  function isUrl(s) {
     let regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
     return regexp.test(s);
  }
  
  function bindButtonEvents() {
    let copyLinks = document.querySelectorAll(".copy-link");
    copyLinks.forEach(button => {
      button.addEventListener("click", () => {
        if (!button.classList.contains("copy-link-clicked")) {
          console.log("got here")
          button.classList.add("copy-link-clicked");
          button.innerHTML = "Copied!";
          setTimeout(() => {
            button.classList.remove("copy-link-clicked");
            button.innerHTML = "Copy";
          }, buttonTimeout); 
        }
      });    
    })    
  }
  
  const copyToClipboard = str => {
    const el = document.createElement('textarea');  // Create a <textarea> element
    el.value = str;                                 // Set its value to the string that you want copied
    el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
    el.style.position = 'absolute';                 
    el.style.left = '-9999px';                      // Move outside the screen to make it invisible
    document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
    const selected =            
      document.getSelection().rangeCount > 0        // Check if there is any content selected previously
        ? document.getSelection().getRangeAt(0)     // Store selection if found
        : false;                                    // Mark as false to know no selection existed before
    el.select();                                    // Select the <textarea> content
    document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
    document.body.removeChild(el);                  // Remove the <textarea> element
    if (selected) {                                 // If a selection existed before copying
      document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
      document.getSelection().addRange(selected);   // Restore the original selection
    }
  };
  
  
  function validateInput(input) {
    if (!isUrl(input)) {
      if (!linkInput.classList.contains("input-highlighted")) {
        linkInput.classList.add("input-highlighted");
      }
      feedbackText.innerHTML = "Please add a link";
      return false;
    } else {
      linkInput.classList.remove("input-highlighted");
      feedbackText.innerHTML = "";
      return true;
    }
  }
  
  function generateCard(link) {
    getShortenedLink(link, newLink => {
      linkBoxes.push({key: Math.floor(100000000 * Math.random()), input: link, output: newLink});
      localStorage.setItem("boxes", JSON.stringify(linkBoxes));
      ReactDOM.render(<LinkOutput boxes={linkBoxes} />, outputContainer);
    })
  }
  
  function getLinkSuffix(link, callback) {
    fetch("https://rel.ink/api/links/", {
      method: "post",
      mode: "cors",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        url: link
      })
    })
    .then(response => response.json())
    .then(data => {
      callback(data);
    })
  }
  
  async function getShortenedLink(link, callback) {
    let shortenedLink = "";
    await getLinkSuffix(link, data => {
      shortenedLink = `https://rel.ink/${data.hashid}`;
      callback(shortenedLink);
    });
  }
  
}