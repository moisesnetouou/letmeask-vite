import { Routes, Route } from 'react-router-dom';

import { Home } from '../pages/Home';
import { NewRoom } from '../pages/NewRoom';
import { Room } from '../pages/Room';
import { AdminRoom } from '../pages/AdminRoom';
import { AllRooms } from '../pages/AllRooms';
import { Dashboard } from '../pages/Dashboard';
import { Profile } from '../pages/Profile';
import { NotRequireAuth, RequireAuth } from './PermissionsLogin';

export default function MainRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <NotRequireAuth>
            <Home />
          </NotRequireAuth>
        }
      />

      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route path="/me" element={<Profile />} />
      <Route path="/rooms/new" element={<NewRoom />} />
      <Route path="/rooms/:id" element={<Room />} />

      <Route path="/rooms/all" element={<AllRooms />} />

      <Route path="/admin/rooms/:id" element={<AdminRoom />} />
    </Routes>
  );
}
