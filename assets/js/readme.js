document.getElementById("laravel").click();
document
  .getElementById("fileInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      readReameFile(file);
    }
  });
function readReameFile(file) {
  if (typeof file === "string") {
    fetch(file)
      .then((response) => response.text())
      .then((text) => {
        const htmlContent = marked.parse(text);
        filterLinks(htmlContent);
      })
      .catch((error) => {
        alert("Error loading the file: " + error.message);
      });
  } else if (file && file.name.endsWith(".md")) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const markdownContent = e.target.result;
      const htmlContent = marked.parse(markdownContent);
      filterLinks(htmlContent);
    };
    reader.readAsText(file);
  } else {
    alert("Please upload a valid Markdown (.md) file");
  }
}
function filterLinks(htmlContent) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;

  const anchorTags = tempDiv.querySelectorAll("a");
  const filteredLinks = Array.from(anchorTags)
    .filter((anchor) => anchor.getAttribute("href").includes("#"))
    .map((anchor) => {
      const href = anchor.getAttribute("href");
      const cleanHref = href.replace(/#\w{1,2}-/g, "#");
      anchor.setAttribute("href", cleanHref);
      return cleanHref;
    });

  filteredLinks.forEach((element) => {
    const content = element.replace(/[#-]/g, " ").toLowerCase();
    tempDiv
      .querySelectorAll("h1, h2, h3, h4, h5, h6")
      .forEach((heading) => {
        const headingText = heading.textContent.trim().toLowerCase();
        const searchText = content.trim().toLowerCase();
        if (!heading.id && headingText.includes(searchText)) {
          heading.id = element.replace(/[#]/g, "");
        }
      });
  });
  document.getElementById("output").innerHTML = tempDiv.innerHTML;
  showCopyBtn()
}
const colors = ["blue", "purple", "red", "green", "orange","grey","white","black"];
let index = 0;
function animateConsoleLog() {
    console.clear();
    console.log(
        `https://darpanadhikari.com.np`,
        `font-size: 40px; color: #fff; text-shadow: 2px 2px 4px rgba(0,0,0,0.4); 
        background: linear-gradient(to right, ${colors[index]}, ${colors[(index + 1) % colors.length]}); 
        padding: 10px;`
    );
    index = (index + 1) % colors.length;
    setTimeout(animateConsoleLog, 500);
}
animateConsoleLog();
function showCopyBtn(){
  document.querySelectorAll('pre').forEach(pre => {
    const button = document.createElement('button');
    button.classList.add('copy-btn');
    button.textContent = '📋 Copy';
    const codeText = pre.querySelector('code').textContent.trim();
    let codeElement = pre.querySelector('code');
    let codeType = codeElement?.getAttribute('class')?.includes('-') ? codeElement.getAttribute('class').split('-')[1] : null;
    codeType = (codeType == 'bash')?'comand':codeType;
    pre.querySelector('code').style.setProperty("--text", `"${codeType}"`);
    button.addEventListener('click', () => {
        navigator.clipboard.writeText(codeText).then(() => {
            button.textContent = 'Copied!';
            setTimeout(() => (button.textContent = '📋 Copy'), 2000);
        });
    });
    pre.style.position = 'relative';
    pre.appendChild(button);
  });
}

const scrollTop = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    scrollTop.classList.add('show');
  } else {
    scrollTop.classList.remove('show');
  }
});
scrollTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
