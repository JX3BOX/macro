function getMacroLink(id, tab) {
    let query = tab ? `?tab=${tab}` : "";
    return `/macro/${id}${query}`;
}

export { getMacroLink };