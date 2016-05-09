describe("Notification", function() {
    var Notification = window.Notification;

    it('Should be an Object', function() {
        expect(Notification instanceof Object).toBe(true);
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

    it('Test dir param', function() {
        
    });

    it('Instance creation', function() {
        // Test notification with no params.
        expect(function() {return new Notification}).toThrowError();

        // Test notification with params which is not an object
        expect(function() {return new Notification('', '')}).toThrowError();

        // Test incorrect dir option
        expect(function() {return new Notification('', {'dir': 'a'})}).toThrowError();

        // Test valid Notification
        expect('object' === typeof (new Notification(''))).toBe(true);
    });
});
