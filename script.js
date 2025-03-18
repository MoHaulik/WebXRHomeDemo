document.addEventListener('DOMContentLoaded', () => {
  // Define static links with smart thumbnail file names (host these in your GitHub repo under "thumbnails/")
  const staticLinks = [
    // Video category
    {
      id: 1,
      title: "Tegnefilm",
      url: "https://immersive-web.github.io/webxr-samples/stereo-video.html",
      category: "video",
      thumbnail: "thumbnails/tegnefilm.jpg"
    },
    {
      id: 2,
      title: "Natur",
      url: "https://immersive-web.github.io/webxr-samples/360-photos.html",
      category: "video",
      thumbnail: "thumbnails/natur.jpg"
    },
    // Spil category
    {
      id: 3,
      title: "Bue og Pil",
      url: "https://engine.needle.tools/samples-uploads/bow-and-arrow/",
      category: "spil",
      thumbnail: "thumbnails/bue-og-pil.jpg"
    },
    {
      id: 4,
      title: "Klodser",
      url: "https://play.js13kgames.com/medieval-matchup/",
      category: "spil",
      thumbnail: "thumbnails/klodser.jpg"
    },
    {
      id: 5,
      title: "Sample",
      url: "https://play.eyejack.xyz/link/?url=https%3A%2F%2Fpmndrs.github.io%2Fxr%2Fexamples%2Feditor%2F",
      category: "spil",
      thumbnail: "thumbnails/sample.jpg"
    },
    {
      id: 6,
      title: "Art Salad",
      url: "https://artsalad.net/",
      category: "spil",
      thumbnail: "thumbnails/art-salad.jpg"
    },
    // Øvelser category
    {
      id: 7,
      title: "Boks",
      url: "https://davehill00.github.io/box/dist/index-beta.html",
      category: "ovelse",
      thumbnail: "thumbnails/boks.jpg"
    },
    {
      id: 8,
      title: "Hænder",
      url: "https://webxr-custom-hands.vercel.app/",
      category: "ovelse",
      thumbnail: "thumbnails/haender.jpg"
    }
  ];
  
  let currentCategory = 'video';
  
  const contentEl = document.getElementById('content');
  const menuItems = document.querySelectorAll('.menu-bar .categories li');
  const searchToggleBtn = document.getElementById('searchToggleBtn');
  const searchContainer = document.getElementById('searchContainer');
  const searchInput = document.getElementById('searchInput');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const refreshBtn = document.getElementById('refreshBtn');
  
  // Function to display links for the selected category and search filter
  const displayLinks = (category, filterTerm = '') => {
    contentEl.innerHTML = '';
    let linksToDisplay = staticLinks.filter(link => link.category === category);
    if (filterTerm) {
      filterTerm = filterTerm.toLowerCase();
      linksToDisplay = linksToDisplay.filter(link => link.title.toLowerCase().includes(filterTerm));
    }
    if (linksToDisplay.length === 0) {
      contentEl.innerHTML = '<p style="color: #333; padding: 20px;">Ingen links i denne kategori endnu.</p>';
      return;
    }
    
    const fragment = document.createDocumentFragment();
    linksToDisplay.forEach(link => {
      const card = document.createElement('div');
      card.className = 'link-card';
      card.addEventListener('click', () => {
        openLink(link.url);
      });
      
      const thumbnailDiv = document.createElement('div');
      thumbnailDiv.className = 'card-thumbnail';
      thumbnailDiv.style.backgroundImage = `url(${link.thumbnail})`;
      
      const contentDiv = document.createElement('div');
      contentDiv.className = 'card-content';
      const titleEl = document.createElement('h3');
      titleEl.textContent = link.title;
      contentDiv.appendChild(titleEl);
      
      card.appendChild(thumbnailDiv);
      card.appendChild(contentDiv);
      fragment.appendChild(card);
    });
    contentEl.appendChild(fragment);
  };
  
  // Opens links – special handling for YouTube embed URLs
  const openLink = url => {
    if (url.includes("youtube.com/embed")) {
      const newWindow = window.open('', '_blank');
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>YouTube Video</title>
            <style>
              body, html {
                margin: 0;
                padding: 0;
                height: 100%;
                background: #000;
              }
              .video-container {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 80%;
                height: 80%;
              }
              iframe {
                width: 100%;
                height: 100%;
                border: none;
              }
            </style>
          </head>
          <body>
            <div class="video-container">
              <iframe src="${url}" allowfullscreen></iframe>
            </div>
          </body>
        </html>
      `);
      newWindow.document.close();
    } else {
      window.open(url, '_blank');
    }
  };
  
  // Set up menu category event listeners
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      currentCategory = item.getAttribute('data-category');
      displayLinks(currentCategory, searchInput.value);
    });
  });
  
  // Toggle search container visibility
  searchToggleBtn.addEventListener('click', () => {
    searchContainer.classList.toggle('active');
    if (searchContainer.classList.contains('active')) {
      searchInput.focus();
    } else {
      searchInput.value = '';
      displayLinks(currentCategory, '');
    }
  });
  
  searchInput.addEventListener('input', () => {
    displayLinks(currentCategory, searchInput.value);
  });
  
  // Fullscreen functionality
  fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Kunne ikke gå i fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  });
  
  // Refresh button – simply reloads the page
  refreshBtn.addEventListener('click', () => {
    location.reload();
  });
  
  // Display the default category on load
  displayLinks(currentCategory);
});
