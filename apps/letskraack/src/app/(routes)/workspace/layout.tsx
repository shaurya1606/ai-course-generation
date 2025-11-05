import React from 'react'
import WorkspaceProvider from './provider'


const WorkspaceLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <WorkspaceProvider>

                {children}

            </WorkspaceProvider>
        </div>
    )
}

export default WorkspaceLayout