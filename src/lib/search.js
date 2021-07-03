import { categories } from './constants';

export function group(docs = []) {
	let _docs = {};
	Object.keys(categories).forEach((c) => (_docs[c] = []));

	for (let i = 0; i < docs.length; i++) {
		const { category } = docs[i];

		if (!_docs[category]) _docs[category] = [];
		_docs[category].push(docs[i]);
		_docs[category].sort((a, b) => {
			if (a.order || b.order) return a.order < b.order ? -1 : 1;
			return a.label < b.label ? -1 : 1;
		});
	}

	return _docs;
}
export function search(docs, search = '') {
	if (!search) return docs;

	const tokens = search
		.toLowerCase()
		.split(' ')
		.map((s) => s.trim());

	let _filteredDocs = docs.filter((d) => {
		return tokens.every(
			(t) =>
				d.label?.toLowerCase().includes(t) ||
				d.headers?.some((h) => h.label?.toLowerCase().includes(t))
		);
	});
	return _filteredDocs;
}
