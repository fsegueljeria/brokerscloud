// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import { useTheme } from '@mui/material/styles'
import Chip from '@mui/material/Chip'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Type Imports
import type { getDictionary } from '@/utils/getDictionary'
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'

// import { GenerateVerticalMenu } from '@components/GenerateMenu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

// Menu Data Imports
// import menuData from '@/data/navigation/verticalMenuData'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='ri-arrow-right-s-line' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ dictionary, scrollMenu }: Props) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const params = useParams()

  // Vars
  const { isBreakpointReached, transitionDuration } = verticalNavOptions
  const { lang: locale } = params

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 10 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='ri-circle-line' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <MenuItem href={`/${locale}/dashboards`}>{dictionary['navigation'].home}</MenuItem>

        <MenuSection label={dictionary['navigation'].clientsManagement}>
          <SubMenu
            label={dictionary['navigation'].clients}
            icon={<i className='ri-user-3-line' />}

            suffix={<Chip label='5' size='small' color='primary' />}
          >
            <MenuItem href={`/${locale}/leads`}>{dictionary['navigation'].leads}</MenuItem>
            <MenuItem href={`/${locale}/prospectos`}>{dictionary['navigation'].activeClients}</MenuItem>
          </SubMenu>

          <SubMenu
            label={dictionary['navigation'].property}
            icon={<i className='ri-building-line' />}
          >
            <MenuItem href={`/${locale}/propiedades`}>{dictionary['navigation'].generalList}</MenuItem>
            <MenuItem href={`/${locale}/property/add`}>{dictionary['navigation'].newProperty}</MenuItem>
          </SubMenu>

        </MenuSection>

        
        <MenuSection label={dictionary['navigation'].comercialManagement}>
          <SubMenu
            label={dictionary['navigation'].opportunities}
            icon={<i className='ri-hand-coin-line' />}
          >
            <MenuItem href={`/${locale}/oportunidades`}>{dictionary['navigation'].opportunitiesList}</MenuItem>
            <MenuItem href={`/${locale}/oportunidades/kanban`}>{dictionary['navigation'].opportunitiesKanban}</MenuItem>
          </SubMenu>

          <SubMenu
            label={dictionary['navigation'].visits}
            icon={<i className='ri-calendar-check-line' />}
          >
            <MenuItem href={`/${locale}/visitas`}>{dictionary['navigation'].visitasList}</MenuItem>
          </SubMenu>

          <SubMenu
            label={dictionary['navigation'].offers}
            icon={<i className='ri-price-tag-3-line' />}
          >
            <MenuItem href={`/${locale}/ofertas`}>{dictionary['navigation'].offerList}</MenuItem>
          </SubMenu>
        </MenuSection>
          
        
        <MenuSection label={dictionary['navigation'].closeBusiness}>
          <SubMenu
              label={dictionary['navigation'].transactions}
              icon={<i className='ri-exchange-dollar-line' />}
            >
            <MenuItem href={`/${locale}/transaction/contracts`}>{dictionary['navigation'].contract}</MenuItem>
            <MenuItem href={`/${locale}/transaction/docs`}>{dictionary['navigation'].signAndDocs}</MenuItem>
            <MenuItem href={`/${locale}/transaction/delivery`}>{dictionary['navigation'].deliveryRecord}</MenuItem>
          </SubMenu>
        </MenuSection>
        <MenuSection label="Tutoriales">
          <SubMenu
            label="Tutoriales"
            icon={<i className='ri-video-line' />}
          >
            <MenuItem href={`/${locale}/tutoriales`}>Ver Tutoriales</MenuItem>
            <MenuItem href={`/${locale}/tutoriales/guia-usuario`}>Guia Usuario</MenuItem>
            <MenuItem href={`/${locale}/tutoriales/happy-path`}>Happy Path</MenuItem>
          </SubMenu>
        </MenuSection>

        <MenuSection label={dictionary['navigation'].backoffice}>
          <SubMenu
              label={dictionary['navigation'].administration}
              icon={<i className='ri-settings-3-line' />}
            >
            <MenuItem href={`/${locale}/admin/users`}>{dictionary['navigation'].usersAndRoles}</MenuItem>
            <MenuItem href={`/${locale}/admin/comission`}>{dictionary['navigation'].commissionsAndParams}</MenuItem>
            <MenuItem href={`/${locale}/admin/integration`}>{dictionary['navigation'].integrations}</MenuItem>
          </SubMenu>
        </MenuSection>
          

      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
