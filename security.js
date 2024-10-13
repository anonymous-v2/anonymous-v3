// // 1. Disable Right-Click (Context Menu)

   
//    document.addEventListener('contextmenu', function(e) {
//         e.preventDefault();
//     });

// // 2. Disable Keyboard Shortcuts (F12, Ctrl+Shift+I, etc.)

//     document.onkeydown = function(e) {
//         if (e.keyCode == 123 ||  // F12
//             (e.ctrlKey && e.shiftKey && e.keyCode == 73) || // Ctrl+Shift+I
//             (e.ctrlKey && e.keyCode == 85) || // Ctrl+U
//             (e.ctrlKey && e.shiftKey && e.keyCode == 67)) { // Ctrl+Shift+C
//             return false;
//         }
//     };

//     // 5. Disable Developer Tools Detection (Advanced)

//     (function() {
//         const element = new Image();
//         Object.defineProperty(element, 'id', {
//             get: function() {
//                 alert('Developer tools detected!');
//                 window.location.href = 'https://your-site.com';
//             }
//         });
//         console.log(element);
//     })();

// // 6. Disable Inspect Element (Using Alerts)

//     document.onkeydown = function(e) {
//         if (e.keyCode == 123 || // F12
//             (e.ctrlKey && e.shiftKey && e.keyCode == 73) || // Ctrl+Shift+I
//             (e.ctrlKey && e.shiftKey && e.keyCode == 67)) { // Ctrl+Shift+C
//             alert('Sorry, you cannot inspect this page!');
//             return false;
//         }
//     };

//     // 11. Use Frame Busters

//     if (window.self !== window.top) {
//         window.top.location = window.self.location;
//     }

//     // 17. Monitor for Developer Tools


//     var devtoolsOpen = false;
//     var threshold = 160;
    
//     setInterval(function() {
//         if (window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold) {
//             if (!devtoolsOpen) {
//                 alert("Developer tools detected!");
//                 devtoolsOpen = true;
//                 window.location.href = "https://example.com"; // You can redirect if needed
//             }
//         } else {
//             devtoolsOpen = false;
//         }
//     }, 1000);


//     // 19. Disable Browser Debugger with Infinite Loops

//     (function() {
//         var x = new Date();
//         while (x) {
//             console.log('Debugger detected!');
//         }
//     })();