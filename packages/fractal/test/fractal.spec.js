import { Web } from '@frctl/web';

import { create } from '../src/fractal';
import Cli from '../src/cli';
import ComponentSource from '../src/api/components';
import DocSource from '../src/api/docs/source';
import fsExtra from 'fs-extra';
import { URL, fileURLToPath } from 'url';

const { readJsonSync } = fsExtra;
const __dirname = fileURLToPath(new URL('.', import.meta.url));
const pkg = readJsonSync(__dirname + '../package.json');

describe('Fractal', () => {
    let app = create();
    beforeEach(() => {
        app.web;
        app.cli;
        app.docs;
        app.components;
    });

    it('is an event emitter', () => {
        expect(app.hasMixedIn('Emitter')).toBe(true);
    });
    it('is configurable', () => {
        expect(app.hasMixedIn('Configurable')).toBe(true);
    });

    describe('.cli', () => {
        it('is a command line interface handler', () => {
            expect(app.cli).toBeInstanceOf(Cli);
        });
    });

    describe('.web', () => {
        it('is a web interface handler', () => {
            expect(app.web).toBeInstanceOf(Web);
        });
    });

    describe('.components', () => {
        it('is a component source instance', () => {
            expect(app.components).toBeInstanceOf(ComponentSource);
        });
    });

    describe('.docs', () => {
        it('is a documentation source instance', () => {
            expect(app.docs).toBeInstanceOf(DocSource);
        });
    });

    describe('.version', () => {
        it('matches the version number set in the package.json file', () => {
            expect(app.version).toEqual(pkg.version);
        });
    });

    // describe('.load()', function(){
    //     it('returns a promise that resolves to an object of loaded sources', function(){
    //         const prom = fractal.load();
    //         expect(prom).to.eventually.be.an('object');
    //         expect(prom).to.eventually.have.a.property('components');
    //         expect(prom).to.eventually.have.a.property('docs');
    //         expect(prom.then(p => p.components)).to.eventually.equal(fractal.components);
    //         expect(prom.then(p => p.docs)).to.eventually.equal(fractal.docs);
    //     });
    //     it('calls load() on all sources', function(){
    //         const components       = fractal.source('components');
    //         const docs            = fractal.source('docs');
    //         const componentLoadSpy = sinon.spy(components, 'load');
    //         const pageLoadSpy      = sinon.spy(docs, 'load');
    //         return fractal.load().then(() => {
    //             expect(componentLoadSpy.calledOnce).toBe(true);
    //             expect(pageLoadSpy.calledOnce).toBe(true);;
    //         });
    //     });
    // });
});
