describe("Ext.data.proxy.Direct", function() {

    var proxy, api, provider,
        readSpy, createSpy, updateSpy, destroySpy, directSpy;

    function makeProxy(cfg) {
        proxy = new Ext.data.proxy.Direct(cfg);
    }

    function makeSpy(name) {
        var directCfg = spec.DirectSpecs.read.directCfg,
            spy = spyOn(spec.DirectSpecs, name);

        spy.directCfg = directCfg;
        return spy;

    }

    beforeEach(function() {
        api = {
            actions: {
                'DirectSpecs': [{
                    len: 0,
                    name: 'read'
                }, {
                    len: 0,
                    name: 'create'
                }, {
                    len: 0,
                    name: 'update'
                }, {
                    len: 0,
                    name: 'destroy'
                }, {
                    len: 0,
                    name: 'directFn'
                }]
            },
            namespace: "spec",
            type: "remoting",
            url: "fake"
        }
        provider = Ext.direct.Manager.addProvider(api);
        readSpy = makeSpy('read');
        createSpy = makeSpy('create');
        updateSpy = makeSpy('update');
        destroySpy = makeSpy('destroy');
        directSpy = makeSpy('directFn');
    });

    afterEach(function() {
        Ext.destroy(proxy);
        Ext.direct.Manager.removeProvider(provider);
        provider = proxy = null;
        readSpy = createSpy = updateSpy = destroySpy = directSpy = null;
    });

    it("should use the directFn for all requests", function() {
        makeProxy({
            directFn: directSpy
        });
        proxy.read(new Ext.data.operation.Read());
        proxy.create(new Ext.data.operation.Create());
        proxy.update(new Ext.data.operation.Update());
        proxy.erase(new Ext.data.operation.Destroy());
        expect(directSpy.callCount).toBe(4);
    });

    it("should use the api methods", function() {
        makeProxy({
            api: {
                read: readSpy,
                create: createSpy,
                update: updateSpy,
                destroy: destroySpy
            }
        });
        proxy.read(new Ext.data.operation.Read());
        expect(readSpy.callCount).toBe(1);
        proxy.create(new Ext.data.operation.Create());
        expect(createSpy.callCount).toBe(1);
        proxy.update(new Ext.data.operation.Update());
        expect(updateSpy.callCount).toBe(1);
        proxy.erase(new Ext.data.operation.Destroy());
        expect(destroySpy.callCount).toBe(1);
    });

    describe("string name resolving", function() {
        it("should resolve for the directFn", function() {
            makeProxy({
                directFn: 'spec.DirectSpecs.directFn'
            });
            proxy.read(new Ext.data.operation.Read());
            expect(directSpy.callCount).toBe(1);
        });

        it("should be able to resolve a new directFn after loading", function() {
            makeProxy({
                directFn: 'spec.DirectSpecs.directFn'
            });
            proxy.read(new Ext.data.operation.Read());
            proxy.setDirectFn('spec.DirectSpecs.read');
            proxy.read(new Ext.data.operation.Read());
            expect(readSpy.callCount).toBe(1);
        });

        it("should resolve for the api", function() {
            makeProxy({
                api: {
                    read: 'spec.DirectSpecs.read',
                    create: 'spec.DirectSpecs.create',
                    update: 'spec.DirectSpecs.update',
                    destroy: 'spec.DirectSpecs.destroy'
                }
            });
            proxy.read(new Ext.data.operation.Read());
            expect(readSpy.callCount).toBe(1);
            proxy.create(new Ext.data.operation.Create());
            expect(createSpy.callCount).toBe(1);
            proxy.update(new Ext.data.operation.Update());
            expect(updateSpy.callCount).toBe(1);
            proxy.erase(new Ext.data.operation.Destroy());
            expect(destroySpy.callCount).toBe(1);
        });

        it("should be able to resolve a new api after loading", function() {
            makeProxy({
                api: {
                    read: 'spec.DirectSpecs.directFn',
                    create: 'spec.DirectSpecs.directFn',
                    update: 'spec.DirectSpecs.directFn',
                    destroy: 'spec.DirectSpecs.directFn'
                }
            });
            proxy.read(new Ext.data.operation.Read());
            expect(directSpy.callCount).toBe(1);
            proxy.setApi({
                read: 'spec.DirectSpecs.read',
                create: 'spec.DirectSpecs.create',
                update: 'spec.DirectSpecs.update',
                destroy: 'spec.DirectSpecs.destroy'
            });
            proxy.read(new Ext.data.operation.Read());
            expect(readSpy.callCount).toBe(1);
            proxy.create(new Ext.data.operation.Create());
            expect(createSpy.callCount).toBe(1);
            proxy.update(new Ext.data.operation.Update());
            expect(updateSpy.callCount).toBe(1);
            proxy.erase(new Ext.data.operation.Destroy());
            expect(destroySpy.callCount).toBe(1);
        });
    });

});