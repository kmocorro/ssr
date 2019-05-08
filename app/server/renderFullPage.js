export default function renderFullPage(html, preloadedState){
    return `
        <!doctype html>
        <html>
        <head>
            <title>meta/fab4</title>
        </head>
        <body>
            <div id="root">${html}</div>
            <script>
                window._preloaded_state_ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
            </script>
            <script src="/bundle.js"></script>
        </body>
        </html>
    
    `
}