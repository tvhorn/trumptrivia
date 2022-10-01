import React, { Component } from "react";
import {
  Card,
  Typography,
  Button,
  Input,
  notification,
  Avatar,
  Modal,
} from "antd";
const { Text } = Typography;
const { TextArea } = Input;
import Router from "next/router";
import PacManLoader from "react-spinners/PacmanLoader";
import axios from "axios";

class Index extends Component {
  state = {
    width: 0,
    height: 0,
    translation: "",
    input: "",
    loading: false,
    obamna: false,
    visible: false,
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  handleTranslate = async () => {
    try {
      this.setState({ loading: true, translation: "" });
      const { input } = this.state;
      const {
        data: { translation, obamna },
      } = await axios.post("api/translate", {
        input,
      });
      setTimeout(
        () =>
          this.setState({ translation, loading: false, obamna, visible: true }),
        1000
      );
    } catch (e) {
      console.log(e);
      notification["error"]({
        message: "Does not compute.",
      });
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <div>
        <Modal
          centered
          visible={this.state.visible}
          onCancel={() => this.setState({ input: "", visible: false })}
          footer={null}
          width={this.state.width >= 600 ? 500 : 300}
        >
          <Card
            style={{
              marginTop: 20,
            }}
            bordered={true}
            bodyStyle={{
              width: "100%",
              height: this.state.width >= 600 ? 500 : 300,
              padding: 0,
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ width: "90%" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <Avatar
                    src="https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_400x400.jpg"
                    size="large"
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: 10,
                    }}
                  >
                    <Text strong>Donald J. Trump</Text>
                    <Text style={{ fontSize: 12 }}>@realDonaldTrump</Text>
                  </div>
                </div>
                {!this.state.obamna ? (
                  <div
                    style={{
                      marginTop: 10,
                      flexWrap: "wrap",
                      wordWrap: "break-word",
                    }}
                  >
                    <Text>{this.state.translation}</Text>
                  </div>
                ) : (
                  <div
                    style={{
                      marginTop: 10,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <iframe
                      width={"100%"}
                      height={this.state.width >= 600 ? 400 : 200}
                      src="https://www.youtube.com/embed/uO4dvIykFBQ?autoplay=1"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </Modal>

        <div
          style={{
            display: "flex",
            backgroundColor: "#803ee5",
            flexDirection: "column",
          }}
        >
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 20,
                width: "80%",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: this.state.width >= 600 ? 24 : 20,
                  cursor: "pointer",
                }}
                onClick={() => Router.push("/")}
                strong
              >
                Trump Translator
              </Text>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 20,
              marginBottom: 20,
              flexDirection: "column",
              width: "100%",
            }}
          >
            <div style={{ textAlign: "center", width: "80%" }}>
              <Text
                style={{
                  color: "white",
                  fontSize: this.state.width >= 600 ? 48 : 40,
                }}
                strong
              >
                Do you want to speak like Trump?
              </Text>
            </div>

            <div style={{ width: "80%", textAlign: "center" }}>
              <Text
                style={{
                  color: "white",
                  fontSize: this.state.width >= 600 ? 20 : 16,
                }}
              >
                Use our translator to mimic the words of POTUS!
              </Text>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            width: "100%",
            flexDirection: "column",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div>
              <div>
                <TextArea
                  autoSize={{ minRows: 2, maxRows: 8 }}
                  placeholder="Write something."
                  onChange={(event) => {
                    this.setState({ input: event.target.value });
                  }}
                  disabled={this.state.loading}
                  value={this.state.input}
                  maxLength={150}
                />
              </div>

              {this.state.loading ? (
                <div style={{ marginTop: 20, marginBottom: 20 }}>
                  <PacManLoader size={25} color={"#803ee5"} />
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    marginTop: 20,
                  }}
                >
                  <Button
                    onClick={this.handleTranslate}
                    style={{
                      color: "white",
                      backgroundColor:
                        this.state.input.length == 0 ? "grey" : "#803ee5",
                    }}
                    disabled={this.state.input.length == 0}
                  >
                    {" "}
                    Translate{" "}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img src="/face.png" style={{ width: 300, height: 300 }} />
        </div>

        <div
          style={{
            marginBottom: 40,
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: 40,
          }}
        >
          <div style={{ width: "80%", textAlign: "center" }}>
            <Text style={{ fontSize: this.state.width >= 600 ? 18 : 14 }}>
              Created by{" "}
              <a
                href="https://memepac.org"
                target="_blank"
                style={{ color: "#803ee5" }}
              >
                MemePAC
              </a>
            </Text>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
