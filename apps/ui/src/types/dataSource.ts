import { Nullable } from 'types'

export interface DataSource {
  id: string
  name: string
  description: string
  source_type: string
  status: 'Indexing' | 'Ready' | 'Failed'
  workspace_id: Nullable<string>
  is_deleted: boolean
  is_public: boolean
  account_id: string
  created_by: string
  modified_by: string
  error: Nullable<string>
}
