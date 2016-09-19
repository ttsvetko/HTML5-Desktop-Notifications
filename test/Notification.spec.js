describe("Notification", function() {
    var Notification = window.Notification;



    it('Should be an Object', function() {
        expect(Notification instanceof Object).toBe(true);
    });
    it('Should be a function', function() {
        expect(typeof Notification).toBe('function');
    });



    it('Permission Property', function() {
        expect(typeof Notification.permission).toBeDefined();
        expect(typeof Notification.permission).toBe('string');
    });
    it('RequestPermission method', function() {
        var permission = Notification.permission;
        var requestPermission = Notification.requestPermission();
        expect(typeof Notification.requestPermission).toBeDefined();
        expect(typeof Notification.requestPermission).toBe('function');
        expect(Notification.requestPermission() instanceof Promise).toBe(true);
    });



    it('Instance creation', function() {
        // Test notification with no params.
        expect(function() {return new Notification}).toThrowError();

        // Test notification with params which is not an object
        expect(function() {return new Notification('', '')}).toThrowError();

        // If title is null/undefined - it should be displayed as null/undefined
        expect((new Notification(null)).title).toBe('null');
        expect((new Notification(undefined)).title).toBe('undefined');
    });

    it('Test dir param', function() {
        // Test incorrect dir option
        expect(function() {return new Notification('', {'dir': 'a'})}).toThrowError();
        expect(function() {return new Notification('', {'dir': 'undefined'})}).toThrowError();
        expect(function() {return new Notification('', {'dir': null})}).toThrowError();
    });


});
