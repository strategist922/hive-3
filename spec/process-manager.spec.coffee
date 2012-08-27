ProcessManager = require '../lib/process-manager'

describe 'process manager', ->
  snapshot = null

  it 'creates new process if process does not exist', ->
    ProcessManager.getOrCreateProcess 'process1'
    ProcessManager.getOrCreateProcess 'process2'
    expect(ProcessManager.getProcessesSnapshot().processes.length).toBe 2

    snapshot = ProcessManager.getProcessesSnapshot()

  it 'uses existing process if process exists', ->
    ProcessManager.getOrCreateProcess 'process1'
    expect(ProcessManager.getProcessesSnapshot().processes.length).toBe 2

  it 'deletes processes', ->
    ProcessManager.deleteProcess 'process1'
    ProcessManager.deleteProcess 'process2'
    expect(ProcessManager.getProcessesSnapshot().processes.length).toBe 0

  it 'restores processes from snapshot', ->
    ProcessManager.restoreProcessesFromSnapshot snapshot
    expect(ProcessManager.getProcessesSnapshot().processes.length).toBe 2
    expect(ProcessManager.getProcessesSnapshot().processes[0].name).toBe 'process1'
    expect(ProcessManager.getProcessesSnapshot().processes[1].name).toBe 'process2'
