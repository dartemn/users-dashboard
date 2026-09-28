import Image from "next/image";
import { User } from "@/types/user";

export function UsersTable({ users }: { users: User[] }) {
  if (users.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white">
        <p className="text-gray-500">По вашему запросу ничего не найдено</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="border-b border-gray-200 bg-gray-50/50 text-xs font-semibold uppercase tracking-wider text-gray-500">
          <tr>
            <th className="px-6 py-4">Профиль</th>
            <th className="px-6 py-4">Роль</th>
            <th className="px-6 py-4">Компания</th>
            <th className="px-6 py-4">Локация</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50/80 transition-colors">
              <td className="flex items-center gap-4 px-6 py-4">
                <Image
                  src={user.image}
                  alt={user.firstName}
                  width={40}
                  height={40}
                  className="rounded-full bg-gray-100 object-cover"
                />
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">
                    {user.firstName} {user.lastName}
                  </span>
                  <span className="text-gray-500">{user.email}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="text-gray-900">{user.company.title}</span>
                  <span className="text-xs text-gray-500">
                    {user.company.name}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-600">
                {user.address.city}, {user.address.country}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
