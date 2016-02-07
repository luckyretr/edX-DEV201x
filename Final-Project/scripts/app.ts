class PainterApp {
    
        painters: Painter[];

        constructor(public json: string, public painterSelect: string, public painterName: string, public painterStyle: string, public painterExamples: string)
        {
            this.painters = new Array<Painter>();
        }
    
        loadPainters(): void {
            var context = this;
            $.getJSON(this.json, function (data) {
                for (var i: number = 0; i < data.famousPainters.length; i++) {
                    var painter: Painter;
                    painter = new Painter(data.famousPainters[i].name, data.famousPainters[i].style);
                    for (var j: number = 0; j < data.famousPainters[i].examples.length; j++) {
                        painter.addArtWork(data.famousPainters[i].examples[j]);
                    }
                    context.painters.push(painter);
                }
                context.loadSelect();
                context.loadContent();
            });
        }

        loadSelect(): void {
            var select = document.getElementById(this.painterSelect);
            for (var i: number = 0; i < this.painters.length; i++) {
                var option = document.createElement("option");
                option.value = this.painters[i].name;
                option.innerHTML = this.painters[i].name;
                select.appendChild(option);
            }
        }

        loadContent(): void {
            var val = $("#" + this.painterSelect).val();
            var result = this.painters.filter(function (p) {
                return p.name == val;
            });
            if (result) {
                document.getElementById(this.painterName).innerHTML = result[0].name;
                document.getElementById(this.painterStyle).innerHTML = result[0].style;
                document.getElementById(this.painterExamples).innerHTML = result[0].exampleString();
            }
        }
}


window.onload = function () {
    var app = new PainterApp('JSON/famousPainters.json', 'painterSelect', 'painterName', 'painterStyle', 'painterExamples');
    app.loadPainters();
    $("#painterSelect").change(function () {
        app.loadContent();
    });
};