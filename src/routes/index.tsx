import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminRoom } from "../pages/AdminRoom";
import { Home } from "../pages/Home";
import { NewRoom } from "../pages/NewRoom";
import { Room } from "../pages/Room";

export function MainRoutes(){
    return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/rooms/new" element={<NewRoom />} />

          <Route path="/rooms/:id" element={<Room />} />

          <Route path="/admin/rooms/:id" element={<AdminRoom />} />
        </Routes>
      </BrowserRouter>
    )
}