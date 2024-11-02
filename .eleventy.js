const eleventyPluginFilesMinifier = require("@sherby/eleventy-plugin-files-minifier");
const Image = require('@11ty/eleventy-img');
const codeStyleHooks = require("eleventy-plugin-code-style-hooks");

module.exports = function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy("src/assets/css");
    eleventyConfig.addPassthroughCopy("src/assets/js");
    eleventyConfig.addPassthroughCopy("src/assets/img"); 
    eleventyConfig.addPassthroughCopy("src/assets/fonts");
    eleventyConfig.addPassthroughCopy("src/content/clients/img"); 
    eleventyConfig.addPassthroughCopy("src/content/posts/img"); 
    eleventyConfig.addPassthroughCopy("src/content/works/img"); 
    eleventyConfig.addPassthroughCopy("src/static");
    eleventyConfig.addPassthroughCopy("src/admin");
    eleventyConfig.addWatchTarget("src/assets/sass");

    eleventyConfig.addPlugin(eleventyPluginFilesMinifier);

        // Collections portfolio
        eleventyConfig.addCollection('works', (collection) => {
          const works = collection.getFilteredByGlob('src/content/works/**/*.md').reverse();
            return works.sort((a, b) => {
              const orderA = a.data.order || 0; // Ustawiamy domyślną wartość na wypadek braku pola order
              const orderB = b.data.order || 0;
              return orderA - orderB;
            });
          });

        // Collection blog
        eleventyConfig.addCollection('posts', function(collectionApi) {
          return collectionApi.getFilteredByGlob('src/content/posts/**/*.md').reverse();
          });

        // Collection clients
        eleventyConfig.addCollection("clients", function(collectionApi) {
          return collectionApi.getFilteredByGlob('src/content/clients/**/*.md');
          });

        // Collection towns
        eleventyConfig.addCollection("towns", function(collectionApi) {
          return collectionApi.getFilteredByGlob('src/content/towns/**/*.md');
          });

        // Collection faq
        eleventyConfig.addCollection("faq", function(collectionApi) {
          return collectionApi.getFilteredByGlob('src/content/faq/**/*.md');
          });
      
        // Date
        eleventyConfig.addFilter('dateDisplay', require('./src/filters/date-display.js'));
        eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);


        
        eleventyConfig.addShortcode("lineStatic", function() {
          return `<div class="line-static"></div>`;
        });


    
        eleventyConfig.addNunjucksAsyncShortcode('Image', async (src, alt) => {
          if (!alt) {
            throw new Error(`Missing \`alt\` on myImage from: ${src}`);
          }
      
          let stats = await Image(src, {
            widths: [25, 320, 640, 960, 1200, 1800 ],
            formats: ['jpeg', 'webp'],
            urlPath: '/assets/img/',
            outputDir: './public/assets/img/',
          });
      
          let lowestSrc = stats['jpeg'][0]; 
          let largestSrc = stats['jpeg'][1];
      
          const srcset = Object.keys(stats).reduce(
            (acc, format) => ({
              ...acc,
              [format]: stats[format].reduce(
                (_acc, curr) => `${_acc} ${curr.srcset} ,`,
                '',
              ),
            }),
            {},
          );
       
          const source = `<source type="image/webp" srcset="${srcset['webp']}" >`;
      
          const img = `<img
            decoding="async"
            loading="lazy"
            alt="${alt}"
            src="${lowestSrc.url}"
            sizes='(min-width: 1024px) 1024px, 100vw'
            srcset="${srcset['jpeg']}"
            width="${largestSrc.width}"
            height="${largestSrc.height}">`;
 
          return `<div class="image-wrapper blur-load" >
                    <img class="placeholder" src="${lowestSrc.url}" alt="Placeholder" width="${largestSrc.width}" height="${largestSrc.height}"><picture> ${source} ${img} </picture></div>`;
        });

        eleventyConfig.addNunjucksAsyncShortcode('workImage', async (src, alt) => {
          if (!alt) {
            throw new Error(`Missing \`alt\` on myImage from: ${src}`);
          }
        
          let stats = await Image(src, {
            widths: [25, 320, 640, 960, 1200, 1800 ],
            formats: ['jpeg', 'webp'],
            urlPath: '/content/works/img/',
            outputDir: './public/content/works/img/',
          });
      
          let lowestSrc = stats['jpeg'][0];
          let largestSrc = stats['jpeg'][2];
      
          const srcset = Object.keys(stats).reduce(
            (acc, format) => ({
              ...acc,
              [format]: stats[format].reduce(
                (_acc, curr) => `${_acc} ${curr.srcset} ,`,
                '',
              ),
            }),
            {},
          ); 
      
          const source = `<source type="image/webp" srcset="${srcset['webp']}" >`;
      
          const img = `<img
            loading="lazy"
            alt="${alt}"
            src="${lowestSrc.url}"
            sizes='(min-width: 1024px) 1024px, 100vw'
            srcset="${srcset['jpeg']}"
            width="${lowestSrc.width}"
            height="${lowestSrc.height}">`;
      
            return `<div class="image-wrapper blur-load" >
              <img class="placeholder" src="${lowestSrc.url}" alt="Placeholder" width="${largestSrc.width}" height="${largestSrc.height}"><picture> ${source} ${img} </picture></div>`;
        });
        
        eleventyConfig.addNunjucksAsyncShortcode('blogImage', async (src, alt) => {
          if (!alt) {
            throw new Error(`Missing \`alt\` on myImage from: ${src}`);
          }
      
          let stats = await Image(src, {
            widths: [25, 320, 640, 960, 1200, 1800 ],
            formats: ['jpeg', 'webp'],
            urlPath: '/content/posts/img/',
            outputDir: './public/content/posts/img/',
          });
      
          let lowestSrc = stats['jpeg'][0];
          let largestSrc = stats['jpeg'][2];
      
          const srcset = Object.keys(stats).reduce(
            (acc, format) => ({
              ...acc,
              [format]: stats[format].reduce(
                (_acc, curr) => `${_acc} ${curr.srcset} ,`,
                '',
              ),
            }),
            {},
          );
      
          const source = `<source type="image/webp" srcset="${srcset['webp']}" >`;
      
          const img = `<img
            loading="lazy"
            alt="${alt}"
            src="${lowestSrc.url}"
            sizes='(min-width: 1024px) 1024px, 100vw'
            srcset="${srcset['jpeg']}"
            width="${lowestSrc.width}"
            height="${lowestSrc.height}">`;
      
            return `<div class="image-wrapper blur-load" >
              <img class="placeholder" src="${lowestSrc.url}" alt="Placeholder" width="${largestSrc.width}" height="${largestSrc.height}"><picture> ${source} ${img} </picture></div>`;
        });

      // Code blocks
      eleventyConfig.addPlugin(codeStyleHooks, {
        colorPreviews: true,
        defaultLanguage: 'js',
        highlightSyntax: true,
        languageLabels: true,
        lineNumbers: true,
        markdownTrimTrailingNewline: true,
        prism: function(prism) {
          prism.languages.example = {
            tokenname: /\w+/i
          }
        }, 
      });

    // Return your Object options:
    return {
      dir: {
        input: "src",
        output: "public",
        includes: "includes"
      }
    }
  };