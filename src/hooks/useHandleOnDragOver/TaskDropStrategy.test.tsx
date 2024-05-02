import {
  DropTaskContext,
  TaskDropOntoAnotherTaskDropInDifferentGroupStrategy,
  TaskDropOntoAnotherTaskDropInSameGroupStrategy,
  TaskDropOntoEmptyGroupStrategy,
} from './TaskDropStrategy';

describe('TaskDropOntoAnotherTaskDropInDifferentGroupStrategy', () => {
  const taskDropStrategy =
    new TaskDropOntoAnotherTaskDropInDifferentGroupStrategy();
  const dropTaskContext = new DropTaskContext(taskDropStrategy);
  describe('handleTaskDrop', () => {
    it('Should  reduce length of active element tasks list by one and increase over elements tasks lists by one.', () => {
      const activeElement = {
        id: '1123',
        tasksGroupId: '1',
        name: 'Task 1',
        done: false,
      };
      const overElement = {
        id: '22323',
        tasksGroupId: '2',
        name: 'Task 2',
        done: false,
      };
      const tasksGroups = [
        {
          id: '1',
          workspaceId: '1',
          name: 'Group 1',
          tasks: [
            {
              id: '1123',
              tasksGroupId: '1',
              name: 'Task 123',
              done: false,
            },
            {
              id: '1124',
              tasksGroupId: '1',
              name: 'Task 12',
              done: false,
            },
          ],
        },
        {
          id: '2',
          workspaceId: '1',
          name: 'Group 2',
          tasks: [
            {
              id: '22323',
              tasksGroupId: '2',
              name: 'Task 2',
              done: false,
            },
          ],
        },
      ];

      const result = dropTaskContext.handleTaskDrop(
        activeElement,
        overElement,
        tasksGroups
      );

      expect(result?.updatedActiveTasksList?.tasks?.length).toEqual(1);
      expect(result?.updatedOverTaskList?.tasks?.length).toEqual(2);
    });
  });
});

describe('TaskDropOntoAnotherTaskDropInSameGroupStrategy', () => {
  const taskDropStrategy = new TaskDropOntoAnotherTaskDropInSameGroupStrategy();
  const dropTaskContext = new DropTaskContext(taskDropStrategy);
  test('Should change position to from first position to last one.', () => {
    const tasksGroups = [
      {
        id: '1',
        workspaceId: '1',
        name: 'Group 1',
        tasks: [
          {
            id: '1123',
            tasksGroupId: '1',
            name: 'Task 123',
            done: false,
          },
          {
            id: '1124',
            tasksGroupId: '1',
            name: 'Task 12',
            done: false,
          },
          {
            id: '1125',
            tasksGroupId: '1',
            name: 'Task 125',
            done: false,
          },
          {
            id: '1126',
            tasksGroupId: '1',
            name: 'Task 126',
            done: false,
          },
        ],
      },
    ];

    const result = dropTaskContext.handleTaskDrop(
      {
        id: '1126',
        tasksGroupId: '1',
        name: 'Task 126',
        done: false,
      },
      {
        id: '1123',
        tasksGroupId: '1',
        name: 'Task 123',
        done: false,
      },
      tasksGroups
    );

    expect(result?.updatedActiveTasksList?.tasks).toEqual([
      {
        id: '1126',
        tasksGroupId: '1',
        name: 'Task 126',
        done: false,
      },
      {
        id: '1123',
        tasksGroupId: '1',
        name: 'Task 123',
        done: false,
      },
      {
        id: '1124',
        tasksGroupId: '1',
        name: 'Task 12',
        done: false,
      },
      {
        id: '1125',
        tasksGroupId: '1',
        name: 'Task 125',
        done: false,
      },
    ]);
  });

  test('Should change position properly when  moves middle tasks', () => {
    const tasksGroups = [
      {
        id: '1',
        workspaceId: '1',
        name: 'Group 1',
        tasks: [
          {
            id: '1123',
            tasksGroupId: '1',
            name: 'Task 123',
            done: false,
          },
          {
            id: '1124',
            tasksGroupId: '1',
            name: 'Task 12',
            done: false,
          },
          {
            id: '1125',
            tasksGroupId: '1',
            name: 'Task 125',
            done: false,
          },
          {
            id: '1126',
            tasksGroupId: '1',
            name: 'Task 126',
            done: false,
          },
          {
            id: '1127',
            tasksGroupId: '1',
            name: 'Task 127',
            done: false,
          },
          {
            id: '1128',
            tasksGroupId: '1',
            name: 'Task 128',
            done: false,
          },
        ],
      },
    ];
    const result = dropTaskContext.handleTaskDrop(
      {
        id: '1126',
        tasksGroupId: '1',
        name: 'Task 126',
        done: false,
      },
      {
        id: '1125',
        tasksGroupId: '1',
        name: 'Task 125',
        done: false,
      },
      tasksGroups
    );
    expect(result?.updatedActiveTasksList?.tasks).toEqual([
      {
        id: '1123',
        tasksGroupId: '1',
        name: 'Task 123',
        done: false,
      },
      {
        id: '1124',
        tasksGroupId: '1',
        name: 'Task 12',
        done: false,
      },
      {
        id: '1126',
        tasksGroupId: '1',
        name: 'Task 126',
        done: false,
      },
      {
        id: '1125',
        tasksGroupId: '1',
        name: 'Task 125',
        done: false,
      },

      {
        id: '1127',
        tasksGroupId: '1',
        name: 'Task 127',
        done: false,
      },
      {
        id: '1128',
        tasksGroupId: '1',
        name: 'Task 128',
        done: false,
      },
    ]);
  });
  test('Should change position from fist to last one', () => {
    const tasksGroups = [
      {
        id: '1',
        workspaceId: '1',
        name: 'Group 1',
        tasks: [
          {
            id: '1123',
            tasksGroupId: '1',
            name: 'Task 123',
            done: false,
          },
          {
            id: '1124',
            tasksGroupId: '1',
            name: 'Task 12',
            done: false,
          },
          {
            id: '1125',
            tasksGroupId: '1',
            name: 'Task 125',
            done: false,
          },
          {
            id: '1126',
            tasksGroupId: '1',
            name: 'Task 126',
            done: false,
          },
          {
            id: '1127',
            tasksGroupId: '1',
            name: 'Task 127',
            done: false,
          },
          {
            id: '1128',
            tasksGroupId: '1',
            name: 'Task 128',
            done: false,
          },
        ],
      },
    ];
    const result = dropTaskContext.handleTaskDrop(
      {
        id: '1123',
        tasksGroupId: '1',
        name: 'Task 123',
        done: false,
      },
      {
        id: '1128',
        tasksGroupId: '1',
        name: 'Task 128',
        done: false,
      },
      tasksGroups
    );
    expect(result?.updatedActiveTasksList?.tasks).toEqual([
      {
        id: '1124',
        tasksGroupId: '1',
        name: 'Task 12',
        done: false,
      },
      {
        id: '1125',
        tasksGroupId: '1',
        name: 'Task 125',
        done: false,
      },
      {
        id: '1126',
        tasksGroupId: '1',
        name: 'Task 126',
        done: false,
      },

      {
        id: '1127',
        tasksGroupId: '1',
        name: 'Task 127',
        done: false,
      },
      {
        id: '1128',
        tasksGroupId: '1',
        name: 'Task 128',
        done: false,
      },
      {
        id: '1123',
        tasksGroupId: '1',
        name: 'Task 123',
        done: false,
      },
    ]);
  });

  describe('TaskDropOntoEmptyGroupStrategy', () => {
    const taskDropStrategy = new TaskDropOntoEmptyGroupStrategy();
    const dropTaskContext = new DropTaskContext(taskDropStrategy);
    test('Task is dropped onto empty task group then active element changes and over element changes', () => {
      const tasksGroups = [
        {
          id: '1',
          workspaceId: '1',
          name: 'Group 1',
          tasks: [
            {
              id: '1123',
              tasksGroupId: '1',
              name: 'Task 123',
              done: false,
            },
            {
              id: '1124',
              tasksGroupId: '1',
              name: 'Task 12',
              done: false,
            },
          ],
        },
        {
          id: '2',
          workspaceId: '1',
          name: 'Group 2',
          tasks: [],
        },
      ];
      const result = dropTaskContext.handleTaskDrop(
        {
          id: '1123',
          tasksGroupId: '1',
          name: 'Task 123',
          done: false,
        },
        {
          id: '2',
          workspaceId: '1',
          name: 'Group 2',
          tasks: [],
        },
        tasksGroups
      );
      console.log(result?.updatedOverTaskList?.tasks, 'tasks');
      expect(result?.updatedOverTaskList?.tasks).toEqual([
        {
          id: '1123',
          tasksGroupId: '2',
          name: 'Task 123',
          done: false,
        },
      ]);
    });
  });
});
