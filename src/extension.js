// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const helpers = require('./helpers.js');
const tree = require('./tree.js');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {



	


	// vscode.window.registerTreeDataProvider('nodeDependencies', new tree.TreeDataProvider());

	// vscode.commands.registerCommand('extension.nodeSelect', function (range) { 
	// 	console.log('extension.nodeSelect');
	// 	console.log(range); 
	// });


	context.subscriptions.push(
		vscode.commands.registerCommand('vs.help.pull', function () {

			const matched_keywords = helpers.get_matched_keywords(vscode);

			if (matched_keywords.length === 0) {
				return false;
			}
			vscode.window.showQuickPick(matched_keywords).then(function (my_pick) {
				if (typeof my_pick !== 'undefined') {
					helpers.open_help(my_pick);
				}


			});
		})
	);


	context.subscriptions.push(
		vscode.commands.registerCommand('vs.help.search', function () {

			const matched_keywords = helpers.get_return_keywords();

			if (matched_keywords.length === 0) {
				return false;
			}
			vscode.window.showQuickPick(matched_keywords).then(function (my_pick) {
				if (typeof my_pick !== 'undefined') {
					helpers.open_help(my_pick);
				}
			});
		})
	);


	context.subscriptions.push(
		vscode.commands.registerCommand('vs.help.reformat', function () {
			const editor = vscode.window.activeTextEditor;
			editor.document.save().then(function (result) {
				vscode.window.showInformationMessage('Run: ' + editor.document.uri);
				const cmd = "Rscript -e \"styler::style_file('" + editor.document.uri.fsPath.split("\\").join("\\\\") + "')\"";
				const msg = "Run Finished";
				
			    helpers.run_shell_cmd(vscode, cmd, msg);
			
			});
			
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('vs.help.collapse', function () {

			let settings = helpers.workshop_all_project_settings();
			console.log(settings);
			vscode.window.showQuickPick(settings).then(function (my_pick) {
				
				helpers.saver_collapse(my_pick);
				vscode.window.showInformationMessage("Collapse to: " + my_pick.out_path);

			});
			    
			
		
			
		})
	);

}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
