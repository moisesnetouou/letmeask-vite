import { Routes, Route } from 'react-router-dom';

import { Home } from '../pages/Home';
import { NewRoom } from '../pages/NewRoom';
import { Room } from '../pages/Room';
import { AdminRoom } from '../pages/AdminRoom';
import { AllRooms } from '../pages/AllRooms';
import { Dashboard } from '../pages/Dashboard';
import { Profile } from '../pages/Profile';

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/me" element={<Profile />} />
      <Route path="/rooms/new" element={<NewRoom />} />
      <Route path="/rooms/:id" element={<Room />} />

      <Route path="/rooms/all" element={<AllRooms />} />

      <Route path="/admin/rooms/:id" element={<AdminRoom />} />
    </Routes>
  );
}
