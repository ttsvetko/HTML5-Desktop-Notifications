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
        // Test incorrect dir option
        expect(function() {return new Notification('', {'dir': 'a'})}).toThrowError();
        expect(function() {return new Notification('', {'dir': 'undefined'})}).toThrowError();
        expect(function() {return new Notification('', {'dir': null})}).toThrowError();


        // Test valid dir params: undefined/ltr/rtl
        expect((new Notification('', {'dir': undefined})) instanceof Notification).toBe(true);
        expect((new Notification('', {'dir': 'ltr'})) instanceof Notification).toBe(true);
        expect((new Notification('', {'dir': 'rtl'})) instanceof Notification).toBe(true);
    });

    it('Instance creation', function() {
        // Test notification with no params.
        expect(function() {return new Notification}).toThrowError();

        // Test notification with params which is not an object
        expect(function() {return new Notification('', '')}).toThrowError();

        // Test valid Notification
        expect((new Notification('')) instanceof Notification).toBe(true);

        // If title is null/undefined - it should be displayed as null/undefined
        expect((new Notification(null)).title).toBe('null');
        expect((new Notification(undefined)).title).toBe('undefined');
    });
});
