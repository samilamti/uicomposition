(function() {
    var self = window.uicomposition.component('billing/select-billing-address');
    self.attachEventHandler(function (args) {
        var childWindow = window.open('http://localhost:51372/index.html?legalEntity=' + args.legalEntityId + '&resource='+args.resourceId+'&address='+args.addressId, 'childWindow', 'width=500, height=300, top=' + (event.screenY - 100) + ', left=' + (event.screenX - 70));
        window.addEventListener('message', function (event) {
            self.callback(event.data);
            if (event.data[0] === 'accept') {
                childWindow.close();
            }
        });
    });
})();