import axios from "axios";

//書誌情報登録用
export const bookInfo = async (ISBN: string) => {
    const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${ISBN}`);
    const info = res.data.items[0].volumeInfo;
    const title: string = info.title;
    const subtitle: string = info.subtitle;
    const publishedDate: string = info.publishedDate.slice(0, 4);
    const publisher: string = info.publisher;
    const authors = info.authors.reduce((cum: string, cur: string) => cum + ' and ' + cur);

    const citation = `${authors}. <i>${title}: ${subtitle ? subtitle: ''}</i>. <publisherLocation/>: ${publisher}, ${publishedDate}.`;
    return citation;
};

export const paperInfo = async (DOI: string) => {
    const res = await fetch(DOI, {
        headers : {
            'Accept': 'application/rdf+xml;q=0.5, application/vnd.citationstyles.csl+json;q=1.0',
        },
    });
    const data = await res.json();

    if (data.language === 'ja') {
        const authors = data.author.map((n: any) => n.family + n.given);
        const author = authors.reduce((cum: string, cur: string) => cum + '，' + cur);
        const title = data.title;
        const journal = data['container-title'];
        const volume = data.volume;
        const date = data.issued['date-parts'][0][0];
        const page = data.page;

        const citation = `${author}「${title}」『${journal}』第${volume}巻（${date}年），${page}頁．`
        return citation;
    } else {
        const authors = data.author.map((n: any) => n.given + ' ' + n.family);
        const author = authors.reduce((cum: string, cur: string) => cum + ' and ' + cur);
        const title = data.title;
        const journal = data['container-title'];
        const volume = data.volume;
        const date = data.issued['date-parts'][0][0];
        const page = data.page;

        const citation = `${author}, “${title},” <i>${journal}</i> ${volume} (${date}): ${page}.`
        return citation;
    }
};

export const reviewInfo = async (DOI: string) => {
    const res = await fetch(DOI, {
        headers : {
            'Accept': 'application/rdf+xml;q=0.5, application/vnd.citationstyles.csl+json;q=1.0'
        }
    });
    const data = await res.json();

    const authors = data.author.map((n: any) => n.given + ' ' + n.family);
    const author = authors.reduce((cum: string, cur: string) => cum + ', ' + cur);
    const journal = data['container-title'];
    const volume = data.volume;
    const date = data.issued['date-parts'][0][0];
    const page = data.page;

    const citation = `Review by ${author}, <i>${journal}</i> ${volume} (${date}): ${page}.`;
    return citation;
};