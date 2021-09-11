
export const name = 'helpers';
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const { exec } = require("child_process");



export function workshop_all_project_settings() {


  let all_settings = [];

  for(var i in vscode.workspace.workspaceFolders){
		var wp = vscode.workspace.workspaceFolders[i];
    

    const collapse_json = path.join(wp.uri.fsPath, "collapse.json");
    let settings = {  };
    if (fs.existsSync(collapse_json)) {
      
      settings = JSON.parse(fs.readFileSync(collapse_json, 'utf8'));
      

    }

    for(var si in settings){
      let temp_item =settings[si];
      temp_item.label = wp.name+" | "+ temp_item.label;
      temp_item.in_dir = path.join(wp.uri.fsPath, temp_item.in_dir);
      temp_item.out_path = path.join(wp.uri.fsPath, temp_item.out_path);
      all_settings.push(temp_item);


    }

    

	}
  return all_settings;

 

}


export function run_shell_cmd(vscode, cmd, msg) {

  
  exec(cmd, (error, stdout, stderr) => {
   
    if (error) {
      vscode.window.showErrorMessage(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      vscode.window.showErrorMessage(`stderr: ${stderr}`);
      return;
    }
    vscode.window.showInformationMessage(msg);
    vscode.window.showInformationMessage(stdout);


  
  });
 
  return true;

}





function load_key_words() {
  const auto_complete_path = vscode.workspace.getConfiguration('help').get("directory");
  let array_files_filtered = [];
  let keywords = [];
  if (fs.existsSync(auto_complete_path)) {

    let array_files = fs.readdirSync(auto_complete_path);
    function checkWord(keyword) {
      return keyword.endsWith('.json');
    }

    array_files_filtered = array_files.filter(checkWord);

  } else {
    vscode.window.showErrorMessage("Auto complete directory does not exist");
  }

  for (let json_name_i in array_files_filtered) {
    let json_name = array_files_filtered[json_name_i];

    const json_name_full = path.join(auto_complete_path, json_name);

    if (fs.existsSync(json_name_full)) {
      const temp_obj = JSON.parse(fs.readFileSync(json_name_full, 'utf8'));
      keywords.push(temp_obj);
    }
  }

  var merged = [].concat.apply([], keywords);
  return merged;
}



let return_keywords = load_key_words();


export function get_return_keywords() {
  return return_keywords;
}



function get_pattern_text(vscode) {

  const editor = vscode.window.activeTextEditor;
  const position = editor.selection.active;
  const selection = editor.selection;
  const selection_text = editor.document.getText(selection);

  let pattern_text = "";
  if (selection_text != "") {
    pattern_text = selection_text;
  } else {
    const range = editor.document.getWordRangeAtPosition(position);
    const word = editor.document.getText(range).toUpperCase();
    pattern_text = word;
  }

  return pattern_text;

}

export function get_matched_keywords(vscode) {

  let word = get_pattern_text(vscode);
  console.log(word);
  let matched_keywords = [];
  if(word !=""){
    const correct_regex = new RegExp(word, "i");

    let keywords = get_return_keywords();

    matched_keywords = [];

    for (let i = 0; i < keywords.length; i++) {
      if (correct_regex.test(keywords[i].label)) {
        matched_keywords.push(keywords[i]);
      }
    }
  }else{
    matched_keywords = get_return_keywords();

  }

  return matched_keywords;

}


const helper_text_truncate = function (str, length, ending) {
  if (length == null) {
      length = vscode.workspace.getConfiguration('helpTab').get("length");
  }
  if (ending == null) {
      ending = '...';
  }
  if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
  } else {
      return str;
  }
};

function helper_create_web_view(label, body) {
  // Create and show a new webview
  const panel = vscode.window.createWebviewPanel(
      'sasHelp', // Identifies the type of the webview. Used internally
      helper_text_truncate(label), // Title of the panel displayed to the user
      vscode.ViewColumn.Beside, // Editor column to show the new webview panel in.
      { enableCommandUris: true } // Webview options. More on these later.
  );
  panel.webview.html = body;

}

export function open_help(my_pick) {
  helper_create_web_view("Help: " + my_pick.label, my_pick.help);
}




export function saver_collapse(collpase_obj) {

  let in_dir = collpase_obj.in_dir;
  let out_path = collpase_obj.out_path;
  let ends_with = collpase_obj.ends_with;
  let string_builders = [];
  const all_files = saver_walk(in_dir,ends_with);


  for (let i = 0; i < all_files.length; i++) {
      let current_path = all_files[i];
      if (fs.existsSync(current_path) === true) {
          string_builders.push(fs.readFileSync(current_path, 'utf8'));
      }

  }

  fs.writeFileSync(out_path, string_builders.join('\n'));

  return true;

}

const saver_walk = function (dir, ends_with) {
  var results = [];
  var list = fs.readdirSync(dir);
  list.forEach(function (file) {
      file = path.join(dir, file);
      var stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
          /* Recurse into a subdirectory */
          results = results.concat(saver_walk(file, ends_with));
      } else {
          /* Is a file */
          if (file.toLowerCase().endsWith(ends_with.toLowerCase())) { results.push(file); }
      }
  });
  return results;
}