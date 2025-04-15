'use client';
import { UserDetailContext } from '@/context/UserDetailContext';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { useSidebar } from '../ui/sidebar';

function WorkspaceHistory() {
  const { userDetail } = useContext(UserDetailContext);
  const [workspaceList, setWorkSpaceList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const convex = useConvex();
  const { toggleSidebar } = useSidebar();

  useEffect(() => {
    userDetail && GetAllWorkspace();
  }, [userDetail]);

  const GetAllWorkspace = async () => {
    const result = await convex.query(api.workspace.GetAllWorkspace, {
      userId: userDetail?._id,
    });
    setWorkSpaceList(result);
  };

  const handleEditClick = (workspace) => {
    setEditingId(workspace._id);
    setEditedName(workspace?.messages[0]?.content || '');
  };

  const handleSave = async (workspaceId) => {
    try {
      await convex.mutation(api.workspace.UpdateWorkspaceName, {
        workspaceId,
        newName: editedName,
      });

      setWorkSpaceList((prev) =>
        prev.map((w) =>
          w._id === workspaceId
            ? {
                ...w,
                messages: [{ ...w.messages[0], content: editedName }],
              }
            : w
        )
      );

      setEditingId(null);
      setEditedName('');
    } catch (err) {
      console.error('Failed to save name:', err);
    }
  };

  return (
    <div>
      <h2 className="font-medium text-lg">Your Projects</h2>
      <div>
        {workspaceList.map((workspace) => (
          <div key={workspace._id} className="mt-2 flex items-center justify-between">
            {editingId === workspace._id ? (
              <div className="flex items-center gap-2 w-full">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="text-sm bg-transparent border-b border-gray-500 focus:outline-none text-white flex-1"
                />
                <button
                  onClick={() => handleSave(workspace._id)}
                  className="text-xs text-green-400"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <Link href={'/workspace/' + workspace._id} className="flex-1">
                  <h2
                    onClick={toggleSidebar}
                    className="text-sm text-gray-400 font-light hover:text-white cursor-pointer"
                  >
                    {workspace?.messages[0]?.content}
                  </h2>
                </Link>
                <button
                  onClick={() => handleEditClick(workspace)}
                  className="text-xs text-blue-400 ml-2"
                >
                  Edit
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkspaceHistory;
