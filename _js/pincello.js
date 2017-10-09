window.$docsify =
{
    name: '<img alt="Pincello Logo" src="_images/icon.png" height="32" width="32"/><br/>Pincello',
    // repo: 'efduarte/pincello',
    coverpage: true,
    loadSidebar: true,
    subMaxLevel: 0,
    // loadNavbar: true,
    // mergeNavbar: true,
    search:
    {
        noData:
        {
            '/pt-br/': 'Nenhum resultado encontrado!',
            '/': 'No results!'
        },
        paths: 'auto',
        placeholder:
        {
            '/pt-br/': 'Busca',
            '/': 'Search'
        }
    },
    plugins:
    [
        function (hook)
        {
            var footer =
            [
                '<hr/>',
                '<footer>',
                    '<p>Created by Emanuel Felipe Duarte and M. Cecília C. Baranauskas.</p>',
                    '<p>This project is financially supported by <a href="http://fapesp.br/">FAPESP</a> grant #2017/06762-0. The opinions, hypotheses and conclusions or recommendations expressed in this material are the responsibility of the authors and do not necessarily reflect the views of FAPESP. Pincello is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.</p>',
                    '<p>Icon made by <a href="https://www.flaticon.com/authors/nikita-golubev" title="Nikita Golubev">Nikita Golubev</a> and licensed by <a rel="license" href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC 3.0 BY</a>.</p>',
                '</footer>'
            ].join('')

            hook.afterEach(function (html)
            {
                return html + footer
            })

            hook.doneEach(function ()
            {
                var pre = document.getElementsByTagName('pre');
                for (var i = 0; i < pre.length; i++)
                {
                    if (pre[i].getAttribute("data-lang") == "html" || pre[i].getAttribute("data-lang") == "css" || pre[i].getAttribute("data-lang") == "javascript" || pre[i].getAttribute("data-lang") == "arduino")
                    {
                        var button = document.createElement('button');
                        button.className = 'copy-button';
                        button.textContent = '📋 Copy code to clipboard';
                        pre[i].insertBefore(button, pre[i].firstChild);
                    }
                }
            })
        }
    ]
}