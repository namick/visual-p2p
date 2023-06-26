import React from 'react'
import ReactJson from 'react-json-view'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'
import Sheet from '@mui/joy/Sheet'
import Table from '@mui/joy/Table'
import Layout from '../../components/Layout'
import { useRecoilValue } from 'recoil'
import { currentCoreState } from '@renderer/state'
import { SideColumn } from './SideColumn'
import { useColorScheme } from '@mui/joy/styles'

export function Core() {
  const core = useRecoilValue(currentCoreState)
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Layout.Main>
        <Sheet
          sx={{
            borderRadius: 'sm',
            border: '1px solid',
            borderColor: 'divider',
            pb: 1,
          }}
        >
          <Box
            sx={{
              borderBottom: '2px solid',
              borderColor: 'divider',
              display: 'flex',
              textAlign: 'center',
              justifyContent: 'space-between',
              pt: 2,
            }}
          >
            <Typography level="body2" fontWeight="md" noWrap sx={{ width: 120, p: 1 }}>
              Block height
            </Typography>
            <Typography level="body2" fontWeight="md" noWrap sx={{ p: 1 }}>
              Data
            </Typography>
            <Typography level="body2" fontWeight="md" noWrap sx={{ width: 120, p: 1 }}>
              Size
            </Typography>
          </Box>
          <Box
            sx={{
              overflow: 'auto',
              height: 'calc(100vh - 170px)',
            }}
          >
            <Table
              hoverRow
              noWrap
              borderAxis="bothBetween"
              size="lg"
              sx={{
                '& td:nth-of-type(1)': {
                  width: 120,
                  textAlign: 'center',
                },
                '& td:nth-of-type(3)': {
                  width: 120,
                },
              }}
            >
              <tbody>
                {core?.blocks.map((block) => (
                  <>
                    <tr key={block.height} onClick={() => setOpen(!open)}>
                      <td>{block.height}</td>
                      <td>{block.data}</td>
                      <td>{block.size}</td>
                    </tr>
                    <ExpandedRow open={open} valueEncoding={core?.valueEncoding} block={block} />
                  </>
                ))}
              </tbody>
            </Table>
          </Box>
        </Sheet>
      </Layout.Main>

      <SideColumn />
    </>
  )
}

interface ExpandedRowProps {
  open: boolean
  valueEncoding: string
  block: any
}

function ExpandedRow({ open, valueEncoding, block }: ExpandedRowProps) {
  const { mode } = useColorScheme()
  const theme = mode === 'dark' ? 'summerfruit' : 'summerfruit:inverted'
  if (!open || valueEncoding !== 'json') return null

  return (
    <tr>
      <td colSpan={3}>
        <Sheet
          sx={{
            borderRadius: 'sm',
            border: '1px solid',
            borderColor: 'divider',
            p: 1,
            textAlign: 'left',
            overflow: 'auto',
          }}
        >
          <ReactJson
            src={JSON.parse(block.data)}
            name={null}
            theme={theme}
            displayObjectSize={false}
            displayDataTypes={false}
          />
        </Sheet>
      </td>
    </tr>
  )
}
