export function reg(text)  {
    const reg = /\(.*?\)/g;
    let update = text.match(reg); //string[] || null

    if (!update) {
        update = [text];
    }

    return update;
}

