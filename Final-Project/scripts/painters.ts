//Add your initialization logic here
interface IPainter {
    name: string;
    style: string;
    examples: IArtwork[];
    exampleString(): string;
}

interface IArtwork {
    name: string;
}

class Artwork implements IArtwork {
        constructor(public name: string) { }
}

class Painter implements IPainter {

    examples: IArtwork[];

    constructor(public name: string, public style)
    {
        this.examples = new Array<Artwork>();
    }

    addArtWork(name: string): void {
        this.examples.push(new Artwork(name));
    }

    exampleString(): string {
        var artWork = new Array<string>();
        for (var i: number = 0; i < this.examples.length; i++) {
            artWork.push(this.examples[i].name);
        }
        return artWork.toString();
    }
}
