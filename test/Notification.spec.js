describe("Notification", function() {
    var Notification = window.Notification;

    it('Should be an Object', function() {
        expect(Notification instanceof Object).toBe(true);
    });

    it('Should have static properties', function() {
        var permission = Notification.permission;
        var requestPermission = Notification.requestPermission();

        // Check for existance of Notification.permission
        expect(typeof Notification.permission).toBeDefined();
        expect(typeof Notification.permission).toBe('string');

        // Check for existance of Notification.requestPermission
        expect(typeof Notification.requestPermission).toBeDefined();
        expect(typeof Notification.requestPermission).toBe('function');
        // requestPermission() should return Promise
        expect(Notification.requestPermission() instanceof Promise).toBe(true);
    });

    it('Instance creation', function() {
        // Test notification with no params.
        expect(function() {return new Notification}).toThrowError();

        // Test notification with params which is not an object
        expect(function() {return new Notification('', '')}).toThrowError();
    });
});
