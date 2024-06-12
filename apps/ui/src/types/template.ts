
export interface Template {
    id: string
    name: string
    description: string
    template_type: string
    compute_type: string
    container_image: string
    container_start_command: string
    container_disk: number
    volume_disk: number
    volume_mount_path: number
    expose_http_ports: string
    expose_tcp_ports: string
    template_visibility: string
    environment_variables: any
    account_id: string
    created_by: string
    created_on: Date
}

export interface ChangeTemplateModalProps {
    data: {
        handleSelectTemplate:  (template: Template) => void
    }
}

export interface TemplateCardProps {
    template: Template
    handleSelectTemplate: (template: Template) => void
}