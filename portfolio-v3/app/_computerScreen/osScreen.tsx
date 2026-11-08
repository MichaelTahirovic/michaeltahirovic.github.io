import Folder from "./folder"
import Dock from "./dock"
import AppIcon from "./components/appIcon"

export default function OsScreen() {
  return (
    <div className="flex flex-col flex-1 w-screen h-screen bg-green-100">
        <div className="flex flex-col w-full h-bottom-16 flex-1 p-4">
          <AppIcon source="/media/folderIcon.png" appName="Test App"/>
          <AppIcon source="/media/folderIcon.png" appName="Another App"/>
        </div>
        < Dock/>
    </div>
  );
}