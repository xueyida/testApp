import React, {useState, useCallback, useMemo, useEffect} from 'react';
import 'antd/dist/antd.css';
import { Avatar, Icon, Tooltip, Button, Modal, Tree, List } from 'antd';
import classNames from 'classnames';
import QueueAnim from 'rc-queue-anim';
import styles from './App.less';

const { TreeNode } = Tree;

/**
 * Get an upper-cased initials for a human name.
 * @param {string} name A human name
 * @param {number} [maxChars] Limit initial character count, default to `2`
 */
function getNameInitials (name, maxChars = 2) {
  return (
    typeof name === 'string'
    ? (
      name
      .split(' ')
      .slice(0, (Number.isInteger(maxChars) && maxChars > 0) ? maxChars : 2)
      .map((x) => x.charAt(0))
      .join('')
      .toUpperCase()
    )
    : null
  );
}



function SelectStudent (props){
  const { 
    classAndStudentList: cList=[], 
    afterChange, 
    defaultSelectStudent=[],
    showResult,
    title="选择学生",
    buttonSize="small",
  } = props;
  const [selectedStudent, setSelectedStudent] = useState(defaultSelectStudent);
  const [ visible, setVisible ] = useState(false);

  const selectedStudentKeys = useMemo(() => {

    return selectedStudent.map((item) => {
      return item.id;
    })
    .filter((item) => {
      return item;
    })

  },  [selectedStudent])

  
  const getClassesByStudent = useCallback(() => {
    const sedClass = cList.filter((item) => {
      const { children=[] } = item;
      const isIncludeClass = children
      .map((child) => {
        return child.key;
      })
      .filter((key) => {
        return key
      })
      .some((key) => {
        return selectedStudentKeys.includes(key);
      })
      return isIncludeClass;
    })
    .map((item) => {
      const { children=[] } = item;
      const newChildren = children
      .filter((child) => {
        return selectedStudentKeys.includes(child.key)
      })
      return {
        ...item,
        children: newChildren,
      }
    })

    return sedClass;

  }, [cList, selectedStudentKeys])


  const selectedClasses = useMemo(() => {
    return getClassesByStudent();
  }, [getClassesByStudent])


  const sedClassesKeys = useMemo(() => {
    return selectedClasses.map((item) => {
      return item.key;
    })
  }, [selectedClasses])


  // 确认选择
  const confirm = useCallback(() => {
    setVisible(false);
    const sedClass = getClassesByStudent();
    if(afterChange){
      afterChange(sedClass);
    }
  }, [afterChange, getClassesByStudent])

  // 取消选择
  const cancel = useCallback(() => {
    setVisible(false);
  }, [])

  const showModal = useCallback(() => {
    setVisible(true);
  }, [])

  const renderTreeNodes = useCallback((data) => {
   
    return data.map((item) => {
      if(!item.key){
        // 需要后端返回key，不然交互会出错!
        return null;
      }
      if (item.children) {
        return (
          <TreeNode title={item.name} key={item.key} dataRef={item}>
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} title={item.name} {...item} />;
    })
  }, []
  );


  // checkbox选择学生，去除class节点
  const selectStudent = useCallback((_, e) => {
    const { checkedNodes = [] } = e;
    const students = checkedNodes.filter((node) => {
      const {props:nodeProps={}} = node;
      const { dataRef={} } = nodeProps;
      const { children } = dataRef;
      return !children;
    })
    .map((item) => {
      return item.props
    })
    setSelectedStudent(students)
  }, [setSelectedStudent])

  // 删除选择学生
  const cancelSelected = useCallback((student) => {
    const students = selectedStudent.filter((item) => {
      const {id} = item;
      return student.id !== id;
    })
    setSelectedStudent(students)
  }, [selectedStudent])


  const handleClassStudentSelectNone = useCallback((id) => {
    const clearIds = cList.filter((c) => {
      return c.id === id;
    })
    .map((c) => {
      return c.children
    })
    .flat()
    .map((s) => {
      return s.id
    })

    const students = selectedStudent.filter((item) => {
        return !clearIds.includes(item.id);
    })

    setSelectedStudent(students)

  }, [cList, selectedStudent])


  useEffect(() => {
    const sedClass = getClassesByStudent();
    if(afterChange){
      afterChange(sedClass);
    }
  }, [afterChange, getClassesByStudent])


  return (
    <section>
      <section className={styles.classTags}>
        <Button 
          type="primary" 
          size={buttonSize}
          onClick={showModal}
        >
          {title}
        </Button>
        <Modal
          title="选择学生"
          visible={visible}
          onOk={confirm}
          onCancel={cancel}
          className="selectModal"
          width={720}
        >
          <div className={styles.treeContainer}>
            <Tree
              checkable
              onCheck={selectStudent}
              checkedKeys={selectedStudentKeys}
            >
              {renderTreeNodes(cList)}
            </Tree>
          </div>
          <div className={styles.selectedStudent}>
            <div className={styles.selectedStudentHeader}>
              <span className={styles.selectedStudentHeaderTitle}>已有学生</span>
              <span>已选择{selectedStudent.length}位学生</span>
            </div>
            <div className={styles.selectedStudentContent}>
              <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={selectedStudent}
                renderItem={(item) => (
                  <List.Item
                    actions={[<Icon onClick={() => cancelSelected(item)} key="list-loadmore-edit" type="minus-square" theme="filled" />]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title={<a href="https://ant.design">{item.name}</a>}
                    />
                  </List.Item>
                )}
              />
            </div>
          </div>
        </Modal>
      </section>
      <QueueAnim
        key="classGroupList"
        style={showResult ? null : {display: 'none'}}
        className={styles.classList}
      >
        {
          Array.isArray(cList)
          && (
            cList
            .filter((c) => sedClassesKeys.includes(c.id))
            .map((c) => {

              return (
                <div
                  key={c.id}
                  className={styles.class}
                >
                  <div className={styles.classHeader}>
                    <span className={styles.classHeaderName}>
                      <span>{c.name}</span>
                    </span>

                    {
                      (Array.isArray(c.children) && c.children.length)
                      ? (
                        <div key="headerActions" className={styles.classHeaderActions}>
                          <a href onClick={() => handleClassStudentSelectNone(c.id)}>清除选择</a>
                        </div>
                      )
                      : null
                    }
                  </div>

                  <div className={styles.classContent}>
                    {
                      (Array.isArray(c.children) && c.children.length)
                      ? (
                        <QueueAnim
                          key="row"
                          className={styles.studentContainer}
                          type="bottom"
                          interval={60}
                          style={{
                            display: 'flex',
                            flexFlow: 'row wrap',
                            justifyContent: 'flex-start',
                          }}
                        >
                          {
                            c.children
                            .filter((s) => {
                              return selectedStudentKeys.includes(s.id);
                            })
                            .map((s) => (
                              <div
                                key={s.id}
                                className={styles.student}
                              >
                                <Tooltip title={s.name}>
                                  <div
                                    className={classNames(
                                      styles.checkable,
                                    )}
                                  >
                                    <div className={styles.checkableAvatar}>
                                      <span className={styles.checkableAvatarWrapper}>
                                        <Avatar size="large">{getNameInitials(s.name)}</Avatar>
                                        <span className={styles.checkableAvatarOverlay}>
                                          <Icon type="check" />
                                        </span>
                                      </span>
                                    </div>

                                    <div className={styles.studentName}>{s.name}</div>
                                  </div>
                                </Tooltip>
                              </div>
                            ))
                          }
                        </QueueAnim>
                      )
                      : (
                        <div className={styles.emptyClass}>
                          <Icon type="info-circle" />
                          <span style={{ marginLeft: 4 }}>该班级没有学生</span>
                        </div>
                      )
                    }
                  </div>
                </div>
              );
            })
          )
        }
      </QueueAnim>
    </section>
  );
}

export default SelectStudent;
