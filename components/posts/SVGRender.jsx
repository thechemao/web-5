import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import HubIcon from '@mui/icons-material/Hub';
import FolderIcon from '@mui/icons-material/Folder';
import StorageIcon from '@mui/icons-material/Storage';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import CodeIcon from '@mui/icons-material/Code';

export default function SVGRender ({id, height}) {
  if (id == 2) {
    return <HubIcon color='secondary' sx={height? { fontSize: height }: {}}/>
  }
  if (id == 1) {
    return <SettingsSuggestIcon color='secondary' sx={height? { fontSize: height }: {}}/>
  }
  if (id == 6) {
    return <FolderIcon color='secondary' sx={height? { fontSize: height }: {}}/>
  }
  if (id == 4) {
    return <StorageIcon color='secondary' sx={height? { fontSize: height }: {}}/>
  }
  if (id == 5) {
    return <OtherHousesIcon color='secondary' sx={height? { fontSize: height }: {}}/>
  }
  if (id == 3) {
    return <CodeIcon color='secondary' sx={height? { fontSize: height }: {}}/>
  }
}