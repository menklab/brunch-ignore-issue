const theme = require('./config/init');

export function getStore() {
    return theme.getStore();
}
// export main function for server side rendering
// export default app.renderToStringForServer(function(result) {
//     "use strict";
//     return result
// });

if(typeof window !== 'undefined') {
    // Start main application here
    theme.run();
}
