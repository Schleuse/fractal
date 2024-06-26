'use strict';

import { PromiseStream as Stream, mixins } from '@frctl/core';
import anymatch from 'anymatch';
const mix = mixins.mix;
const Collection = mixins.collection;

export default class FileCollection extends mix(Collection) {
    constructor(config, items) {
        super();
        this.setItems(items);
        this.name = config.name || null;
        this.label = config.label || null;
    }

    files() {
        return this.newSelf(this.toArray().filter((i) => i.isFile));
    }

    match(test) {
        return this.newSelf(this.matchItems(this.items(), test));
    }

    matchItems(items, test) {
        const matcher = anymatch(test);
        const ret = [];
        for (const item of items) {
            if (item.isCollection) {
                const collection = item.match(test);
                if (collection.size) {
                    ret.push(collection);
                }
            } else {
                if (matcher(item.path)) {
                    ret.push(item);
                }
            }
        }
        return ret;
    }

    toVinylArray() {
        return this.filter('isFile')
            .flatten()
            .map((file) => file.toVinyl())
            .toArray();
    }

    toVinylStream() {
        return new Stream(this.load().then(() => this.toVinylArray()));
    }

    gulpify() {
        return this.toVinylStream();
    }

    toJSON() {
        const self = super.toJSON();
        self.label = this.label || null;
        self.name = this.name || null;
        return self;
    }
}
