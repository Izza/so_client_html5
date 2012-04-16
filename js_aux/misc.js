/* Stub translate function for eventual i8n. */
function translate(text) {
    return text
};


$(document).ready(function() {
    /* Prevent "event.layerX and event.layerY are broken and deprecated ..."
       WebKit warning message, per:
      http://stackoverflow.com/questions/7825448/webkit-issues-with-event-layerx-and-event-layery
      */
    $.event.props = $.event.props.join('|').replace('layerX|layerY|', '').split('|');
})

/* Object instantiation convenience, from Douglas Crockford */
// if (typeof Object.beget !== 'function') {
//      Object.beget = function (o) {
//         var F = function () {};
//          F.prototype = o;
//          return new F();
//   };
// }

/* from http://forthescience.org/blog/2010/11/30/base32-encoding-in-javascript/
   Unrestrained via "WTFPL": http://sam.zoy.org/wtfpl/
*/
b32encode_trim = function(s) {
    return b32encode(s).replace(/=+$/, '');
}
b32encode = function(s) {
    /* encodes a string s to base32 and returns the encoded string */
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    var parts = [];
    var quanta= Math.floor((s.length / 5));
    var leftover = s.length % 5;

    if (leftover != 0) {
        for (var i = 0; i < (5-leftover); i++) { s += '\x00'; }
        quanta += 1;
    }
    for (i = 0; i < quanta; i++) {
        parts.push(alphabet.charAt(s.charCodeAt(i*5) >> 3));
        parts.push(alphabet.charAt( ((s.charCodeAt(i*5) & 0x07) << 2)
                                    | (s.charCodeAt(i*5+1) >> 6)));
        parts.push(alphabet.charAt( ((s.charCodeAt(i*5+1) & 0x3F) >> 1) ));
        parts.push(alphabet.charAt( ((s.charCodeAt(i*5+1) & 0x01) << 4)
                                    | (s.charCodeAt(i*5+2) >> 4)));
        parts.push(alphabet.charAt( ((s.charCodeAt(i*5+2) & 0x0F) << 1)
                                    | (s.charCodeAt(i*5+3) >> 7)));
        parts.push(alphabet.charAt( ((s.charCodeAt(i*5+3) & 0x7F) >> 2)));
        parts.push(alphabet.charAt( ((s.charCodeAt(i*5+3) & 0x03) << 3)
                                    | (s.charCodeAt(i*5+4) >> 5)));
        parts.push(alphabet.charAt( ((s.charCodeAt(i*5+4) & 0x1F) )));
    }
    var replace = 0;
    if (leftover == 1) replace = 6;
    else if (leftover == 2) replace = 4;
    else if (leftover == 3) replace = 3;
    else if (leftover == 4) replace = 1;
    for (i = 0; i < replace; i++) parts.pop();
    for (i = 0; i < replace; i++) parts.push("=");
    return parts.join("");
}
