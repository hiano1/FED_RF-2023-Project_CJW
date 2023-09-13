import Artists from "../resource/data/artist.json" assert { type: "json" };

export default class Artist {
    artistList = Artists.artists;
    constructor() {
        this.getArtistList();
        this.getAlbumList();
        this.getAlbum();
    }

    getArtistList() {
        const list = [];
        for (let i in this.artistList) {
            let result = this.artistList[i];
            list.push(result);
        }
        return list;
    }
    getAlbumList(name) {
        let result = this.artistList.find((item) => {
            if (item.name === name) {
                return item;
            } else {
                return "not found";
            }
        });

        return result;
    }
    getAlbum(artistIndex) {
        let list = this.artistList[artistIndex];
        return list;
    }
}
