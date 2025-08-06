import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

const VibrantSwitch = styled(Switch)(({ theme }) => ({
  width: 68,
  height: 36,
  padding: 8,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(30px)',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#ff6f61', // لون مرجاني نابض بالحياة عند التشغيل
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#fff',
    width: 20,
    height: 20,
    boxShadow: '0px 2px 4px rgba(0,0,0,0.2)', // إضافة ظل خفيف
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#ffa07a', // لون مرجاني فاتح عند الإيقاف
    borderRadius: 36 / 2,
  },
}));

export default VibrantSwitch;