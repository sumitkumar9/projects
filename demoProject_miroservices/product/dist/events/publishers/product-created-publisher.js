"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCreatedpublisher = void 0;
const base_publisher_1 = require("../../utils/base-publisher");
const subjects_1 = require("../../utils/subjects");
class ProductCreatedpublisher extends base_publisher_1.Publisher {
    constructor() {
        super(...arguments);
        this.subject = subjects_1.Subjects.ProductCreated;
    }
}
exports.ProductCreatedpublisher = ProductCreatedpublisher;
//# sourceMappingURL=product-created-publisher.js.map