#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
// use tauri_plugin_sql::TauriSql;
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// #[tauri::command]
// async fn greet() -> DataStore {
//     let ds = DataStore::new("memory").await?;
//     format!(ds)
// }

fn main() {
    tauri::Builder::default()
        // .plugin(TauriSql::default())
        .plugin(tauri_plugin_sql::Builder::default().build())
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
