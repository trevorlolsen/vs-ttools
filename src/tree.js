export const name = 'tree';
const vscode = require('vscode');

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


export var TreeDataProvider = /** @class */ (function () {
    function TreeDataProvider() {
        this.data = [new TreeItem('cars', [
                new TreeItem('Ford', [new TreeItem('Fiesta'), new TreeItem('Focus'), new TreeItem('Mustang')]),
                new TreeItem('BMW', [new TreeItem('320'), new TreeItem('X3'), new TreeItem('X5')])
            ])];
    }
    TreeDataProvider.prototype.getTreeItem = function (element) {
        console.log("getTreeItem");
        return element;
    };
    TreeDataProvider.prototype.getChildren = function (element) {
        console.log("getChildren");
        if (element === undefined) {
            return this.data;
        }
        return element.children;
    };
    return TreeDataProvider;
}());
var TreeItem = /** @class */ (function (_super) {
    __extends(TreeItem, _super);
    function TreeItem(label, children) {
        console.log("TreeItem");
        var _this = _super.call(this, label, children === undefined ? vscode.TreeItemCollapsibleState.None :
            vscode.TreeItemCollapsibleState.Expanded) || this;
        _this.children = children;
        _this.command = {
            command: 'extension.nodeSelect',
            title: '',
            arguments: [label]
        };
        return _this;
    }
    return TreeItem;
}(vscode.TreeItem));