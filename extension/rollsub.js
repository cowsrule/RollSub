'use strict';

(function ()
{
    var HOST = 'https://localhost';
    var PORT = 6027;

    var frames = document.getElementsByClassName('framedata');

    function generateQueryString(data)
    {
        var queryString = '';

        if (typeof data === 'object')
        {
            var queryArr = [ ];

            for (var key in data)
            {
                if (data.hasOwnProperty(key))
                {
                    queryArr[queryArr.length] = encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
                }
            }

            queryString = queryArr.join('&').replace(/%20/g, '+');
        }
        else
        {
            queryString = data;
        }

        return queryString;
    }

    function handleClick(file, line, col)
    {
        var xhr = new XMLHttpRequest();

        var data = { file: file, line: line, col: col };
        var dataString = generateQueryString(data);

        xhr.open('POST', HOST + ':' + PORT + '/redir?' + dataString);

        xhr.send();
    }

    for (var i = 0; i < frames.length; ++i)
    {
        var frame = frames[i];

        try
        {
            var loc = frame.firstElementChild;

            var fileParse = loc.children[0].innerText.slice(1, -1);
            var lineParse = parseInt(loc.children[1].innerText, 10);
            var colParse = parseInt(loc.children[2].innerText, 10);

            loc.addEventListener('click', handleClick.bind(undefined, fileParse, lineParse, colParse));

            loc.style.cursor = 'pointer';
        }
        catch (err)
        {
            // Ignore
        }
    }
})();
