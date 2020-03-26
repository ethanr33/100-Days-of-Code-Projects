
window.onload = () => {
  
  let backgroundImg = document.getElementById("bg-img");
  let clearQueryButton = document.getElementById("clear-query");
  let mainTagContainer = document.getElementById("main-tag-container");
  
  class Searcher {
    constructor() {
      this.queryTags = [];
      this.searchQuery = [];
    }
    updateQuery(tag) {
      if (!this.searchQuery.includes(tag)) {
        this.renderQueryTag(tag);
      } else {
        this.removeQueryTag(tag);
      }
      this.showRelevantJobs();  
    }
    clearQuery() {
      this.queryTags = [];
      this.searchQuery = [];
      this.rerenderQueryTags();
    }
    rerenderQueryTags() {
      ReactDOM.unmountComponentAtNode(document.getElementById("tag-container"));
      ReactDOM.render(this.queryTags, document.getElementById("tag-container"), () => {
        document.querySelectorAll(".query-container").forEach(element => {
          element.querySelector(".query-icon").addEventListener("click", () => {
            this.removeQueryTag(element.querySelector(".query-tag").innerHTML);
          });
        });
      });
      this.showRelevantJobs();
    }
    renderQueryTag(tag) {
      this.searchQuery.push(tag);
      this.queryTags.push(
        <div className="flex query-container justify-between items-center bg-cyan-background mr-2 -mt-8px border-white border-solid border-b-8">
          <p className="w-auto text-cyan-desaturated inline-block query-tag font-bold text-xs md:text-base text-center tracking-tight rounded-sm p-1 px-2 pb-0 mr-px">{tag}</p>
          <img src="images/icon-remove.svg" alt="X" className="query-icon p-2 bg-cyan-desaturated hover:bg-cyan-verydark rounded-tr-sm rounded-br-sm" />
        </div>
      );
      this.rerenderQueryTags();
    }
    removeQueryTag(tag) {
      this.queryTags.splice(this.searchQuery.indexOf(tag), 1);
      this.searchQuery.splice(this.searchQuery.indexOf(tag), 1);
      this.rerenderQueryTags();
    }
    showRelevantJobs() {
      document.querySelectorAll(".card").forEach(card => {
        let jobAttributes = card.dataset.tags.split(", ");
        let matchArray = new Array(this.searchQuery.length);
        let hasMatch = true;
        matchArray.fill(false);
        this.searchQuery.forEach(query => {
          if (jobAttributes.includes(query)) {
            matchArray[this.searchQuery.indexOf(query)] = true;
          }
        });
        matchArray.forEach(match => {
          if (!match) {
            hasMatch = false;
          }
        })
        if (!hasMatch && card.classList.contains("lg:flex")) {
          card.classList.remove("lg:flex");
          card.classList.add("hidden");
        } else if (hasMatch && card.classList.contains("hidden")) {
          card.classList.add("lg:flex");
          card.classList.remove("hidden");
        }
        if (this.searchQuery.length == 0) {
          if (card.classList.contains("hidden")) {
            card.classList.add("lg:flex");
            card.classList.remove("hidden");
          }
        }
      });
    }
    init() {
      document.querySelectorAll(".job-tag").forEach(tag => {
        tag.addEventListener("click", () => {
          this.updateQuery(tag.innerHTML);
        });
      });
    }
  }
  
  let searcher = new Searcher();
  searcher.init();
  
  
  let updateBackground = () => {
    if (document.documentElement.clientWidth >= 1024) {
      backgroundImg.src = "images/bg-header-desktop.svg";
    } else {
      backgroundImg.src = "images/bg-header-mobile.svg";
    }
  }
  
  clearQueryButton.addEventListener("click", () => {
    searcher.clearQuery();
  });
  
  updateBackground();
  
  window.addEventListener("resize", () => {
    updateBackground();
  });
  
}