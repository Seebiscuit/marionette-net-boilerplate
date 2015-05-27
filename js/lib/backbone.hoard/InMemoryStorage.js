define(function () {
    // around 5MB, matching common localStorage limit
    var STORAGE_SIZE_DEFAULT_LIMIT = 5000000;

    var InMemoryStorage = function () {
        this.storage = {};
        this.size = 0;
    };

   _.extend(InMemoryStorage.prototype, {
        setItem: function (key, value) {
            this.storage[key] = value;
            this.size += value.length;
            if (this.size > STORAGE_SIZE_DEFAULT_LIMIT) {
                // Notify Hoard that the cache is full.
                // This will trigger a cache invalidation.
                throw new Error("On-Page Cache size exceeded");
            }
        },

        getItem: function (key) {
            var value = this.storage[key];
            if (_.isUndefined(value)) {
                value = null;
            }
            return value;
        },

        removeItem: function (key) {
            var value = this.getItem(key);
            delete this.storage[key];
            if (value != null) {
                this.size -= value.length;
            }
        }
   });

   return InMemoryStorage;
});