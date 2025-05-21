import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'

type EntityItem = {
  value: string
  label: string
  imageSrc: string
}

type EntityListProps = {
  items: EntityItem[]
  selectedIndex: string
  onSelect: (index: string) => void
}

const EntityList = ({ items, selectedIndex, onSelect }: EntityListProps) => {
  return (
    <div className='mbs-5 border rounded'>
      <List
            sx={{
              width: '100%',
              bgcolor: 'background.paper',
              position: 'relative',
              overflow: 'auto',
              maxHeight: 180,
              '& ul': { padding: 0 },
            }}
          >
            {items.map((item, index) => (
              <ListItem key={index}
              disablePadding 
              secondaryAction={
                <IconButton edge='end' onClick={e => e.stopPropagation()}>
                  <i className='ri-arrow-right-double-fill text-xl' />
                </IconButton>
              }>
                <ListItemButton selected={selectedIndex === item.value} onClick={() => onSelect(item.value)}>
                  <ListItemAvatar>
                    <Avatar src={item.imageSrc} alt={item.label} />
                  </ListItemAvatar>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
    </div>
  )
}

export default EntityList
