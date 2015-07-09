//http://www.mediacollege.com/internet/javascript/number/random.html

// Creates an 8 digit random string (to use as node.id)
function randomString() {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 8;
    var randomString = '';
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomString += chars.substring(rnum, rnum + 1);
    }
    //document.randform.randomfield.value = randomString;
    return randomString
}


//http://bl.ocks.org/sathomas/774d02a21dc1c714def8
// Here's the part where things get interesting. Because
// we're looking at the `charge` property, that's what we
// want to vary between the read and blue nodes. Most often
// this property is set to a constant value for an entire
// visualization, but D3 also lets us define it as a function.
// When we do that, we can set a different value for each node.

// Negative charge values indicate repulsion, which is generally
// desirable for force-directed graphs. (Positive values indicate
// attraction and can be helpful for other visualization types.)

force.linkStrength(function(link) {
    if (link.className === 'red') return 0.1;
    return 1;
});
