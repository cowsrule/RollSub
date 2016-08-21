var frames = document.getElementsByClassName('framedata');

function generateQueryString(data)
{
    var queryString = '';

    if (typeof data === 'object')
    {
        var queryArr = [ ];

        for (var key in data)
        {
            queryArr[queryArr.length] = encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
        }

        queryString = queryArr.join('&').replace(/%20/g, '+');
    }
    else
    {
        self.Assert(typeof data === 'string', 'Only Objects or Strings are currently supported');

        queryString = data;
    }

    return queryString;
}

for (var i = 0; i < frames.length; ++i)
{
    var frame = frames[i];

    var loc = frame.firstElementChild;

    var file = loc.children[0].innerText.slice(1, -1);
    var line = parseInt(loc.children[1].innerText);
    var col = parseInt(loc.children[2].innerText);

    // var linkNode = document.createElement('span');

    // linkNode.href = 'http://' + file + '.' + line + ':' + col;
    // linkNode.innerText = 'GOTO';

    loc.addEventListener('click', function (file, line, col)
    {
        var xhr = new XMLHttpRequest();

        var data = { file: file, line: line, col: col };
        var dataString = generateQueryString(data);

        xhr.open('POST', 'https://localhost:6027/redir?' + dataString, true);

        xhr.send();
    }.bind(undefined, file, line, col));

    loc.style.cursor = 'pointer';

    // loc.insertBefore(linkNode, loc.firstChild);
}
