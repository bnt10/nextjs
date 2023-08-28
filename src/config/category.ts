import type { IconKeys } from '@/component/common/Icon'

export type CategoryListType = {
  id: string
  title: string
  icon: IconKeys
  color: string
}
export const CategoryList: CategoryListType[] = [
  { id: '1', title: 'Grocery', icon: 'FaBreadSlice', color: '#CCFF80' },
  { id: '2', title: 'Work', icon: 'FaBriefcase', color: '#FF9680' },
  { id: '3', title: 'Sport', icon: 'FaWalking', color: '#80FFFF' },
  { id: '4', title: 'Design', icon: 'FaPaintBrush', color: '#80FFD9' },
  {
    id: '5',
    title: 'University',
    icon: 'FaGraduationCap',
    color: '#809CFF',
  },
  { id: '6', title: 'Social', icon: 'FaUserPlus', color: '#FF80EB' },
  { id: '7', title: 'Music', icon: 'FaMusic', color: '#FC80FF' },
  { id: '8', title: 'Health', icon: 'FaHeartbeat', color: '#80FFA3' },
  { id: '9', title: 'Movie', icon: 'FaVideo', color: '#80D1FF' },
  { id: '10', title: 'Home', icon: 'FaHome', color: '#FFCC80' },
]
